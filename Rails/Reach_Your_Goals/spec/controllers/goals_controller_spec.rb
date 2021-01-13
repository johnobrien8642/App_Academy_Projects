require 'rails_helper'

RSpec.describe GoalsController, type: :controller do
    user = FactoryBot.create(:user)
    goal = FactoryBot.create(:goal, private: false, completed: false)
    
    describe "GET :new" do
      context "when logged in" do
        before do
          allow(controller).to receive(:current_user) { user }
        end
        
        it "has a blank instance of a goal" do 
          get :new, {}
          
          expect(assigns(:goal).class).to be(Goal)
        end
        
        it "renders the new users page" do 
          get :new, {}
  
          expect(response).to render_template(:new)
          expect(response).to have_http_status(200)
        end
      end
    end

    describe "POST :create" do
      context "when logged out" do 
        before do 
          allow(controller).to receive(:current_user) { nil }
        end

        it "redirects to the login page" do 
            post :create, params: { goal: {} }

            expect(response).to redirect_to(new_session_url)
        end
      end

      context "when logged in" do 
        before do 
            allow(controller).to receive(:current_user) { user }
        end
        
        context "with valid params" do
          it "creates a new goal" do 
            post :create, params: { 
                goal: {
                    user_id: user.id,
                    title: "Lose ten pounds!",
                    description: "I will lose ten pounds!"
                }
            }

            expect(response).to redirect_to(user_url(user.id))
          end
        end
  
        context "with invalid params" do
          it "renders :new page with errors" do 
            post :create, params: { 
                user_id: user.id,
                goal: {
                    title: "",
                    description: "I will lose ten pounds!"
                }
            }

            expect(response).to render_template(:new)
            expect(flash[:errors]).to be_present
          end
        end
      end
    end

    describe "GET :edit" do
      context "when logged out" do 
        before do 
            allow(controller).to receive(:current_user) { nil }
        end

        it "redirect to the login page" do 
            get :edit, params: { id: goal.id }

            expect(response).to redirect_to(new_session_url)
        end
      end
      
      
      
      context "when logged in" do
        before do 
          allow(controller).to receive(:current_user) { user }
        end
        
        it "finds ::Goal by param[:id] and renders :edit" do 
          get :edit, params: { id: goal.id }

          expect(response).to render_template(:edit)
          expect(assigns(:goal).id).to eq(goal.id) 
        end
      end
    end

    describe "PATCH :update" do
      before do 
        allow(controller).to receive(:current_user) { user }
      end

      context "when logged in" do  
        it "updates ::Goal title and description" do
          title = "Lose twenty pounds!"
          description = "I want to lose twenty pounds!"
          patch :update, params: { 
            id: goal.id, 
            goal: { 
              title: title, 
              description: description 
            } 
        }
  
          expect(response).to redirect_to(user_url(goal.user_id))        
        end
      end
    end

    describe "DELETE :destroy" do
      
      
      context "when logged in" do 
        before do 
          allow(controller).to receive(:current_user) { user }
        end
        
        it "finds ::Goal by param[:id] and removes from database" do 
          delete :destroy, params: { id: goal.id }
          
          expect(response).to have_http_status(204)
        end
      end
    end
end
