require 'rails_helper'

RSpec.describe UsersController, type: :controller do
    user = FactoryBot.create(:user)

    describe "GET :new" do
      it "renders the new users page" do
        get :new, {}  
        expect(response).to render_template(:new)
        expect(response).to have_http_status(200)
      end
    end

    describe "POST :create" do
      context "when logged in" do
        before do
          allow(controller).to receive(:current_user) { user }
        end

        context "with invalid params" do
          it "validates the presence of username and password" do
              post :create, params: { 
                  user: { 
                      username: "carlosherrera2", 
                      password: "" 
                  } 
              }
          
              expect(response).to render_template('new')
              expect(flash[:errors]).to be_present
          end
  
          it "validates password is at least 6 characters long" do
              post :create, params: { 
                  user: { 
                      username: "carlosherrera3", 
                      password: "12345" 
                  } 
              }
          
              expect(response).to render_template('new')
              expect(flash[:errors]).to be_present
          end
        end
      
        context "with valid params" do
          it "redirects to users show page" do
              post :create, 
                params: { user: { username: "carlosherrera4", 
                password: "carlosherrera4" } }
          
              expect(response).to redirect_to(user_url(User.last))
          end
        end
      end

      context "when logged out" do 
        before do
          allow(controller).to receive(:current_user) { nil }
        end
        
        it "redirects to the login page" do 
            post :create, params: { user: {} }

            expect(response).to redirect_to(new_session_url)
        end
      end
    end

    describe "GET :show" do
      context "when logged in" do
          before do
            allow(controller).to receive(:current_user) { user }
          end

        it "renders show page for user" do
          get :show, params: { id: user.id }  
          
          expect(response).to render_template("show")
        end
      end

      context "when logged out" do 
        before do
          allow(controller).to receive(:current_user) { nil }
        end
        
        it "redirects to the login page" do 
            post :create, params: { user: {} }

            expect(response).to redirect_to(new_session_url)
        end
      end
    end

    describe "POST :destroy" do
      context "when logged in" do
        before do
          allow(controller).to receive(:current_user) { user }
        end
        
        it "deletes user from db" do
            username = "carlosherrera6"
            password = "carlosherrera6"
            user = User.create!(username: username, 
                password: password)
            
            post :destroy, params: { id: user.id }

            find_user = User.find_by_credentials(username, password)
            
            expect(find_user).to eq(nil)
        end
      end

      context "when logged out" do 
        before do
          allow(controller).to receive(:current_user) { nil }
        end
        
        it "redirects to the login page" do 
            post :create, params: { user: {} }

            expect(response).to redirect_to(new_session_url)
        end
      end
    end
end
