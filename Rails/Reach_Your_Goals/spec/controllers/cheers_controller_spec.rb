require 'rails_helper'

RSpec.describe CheersController, type: :controller do
  user = FactoryBot.create(:user)
  cheerer_no_cheers = FactoryBot.create(:user, user_cheers: 0)
  cheerer = FactoryBot.create(:user)

  describe "POST :create" do
    context "when logged out" do
      before do
        allow(controller).to receive(:current_user) { nil }
      end 
      
      it "redirects to the login page" do
        post :create, params: { cheer: {} }  
        
        expect(response).to redirect_to(new_session_url)
      end
    end

    context "when logged in" do 
      before do
        allow(controller).to receive(:current_user) { user }
      end

      context "clicking the Cheers! button" do
        context "with enough cheers" do
          it "creates a new cheer" do
            post :create, params: { user_id: user.id,
              cheer: { 
                celebrator_id: cheerer.id, 
                cheerable_type: "User", 
                cheerable_id: user.id 
                }
              }
  
            expect(response).to redirect_to(user_url(user))
          end
        end

        context "without enough cheers" do
          it "doesn't create a new cheer" do
            post :create, params: { user_id: user.id,
              cheer: { 
                celebrator_id: cheerer_no_cheers.id, 
                cheerable_type: "User", 
                cheerable_id: user.id 
                }
              }
            
            expect(response).to redirect_to(user_url(user))
            expect(flash[:errors]).to be_present 
          end
        end
      end
    end
  end
end

