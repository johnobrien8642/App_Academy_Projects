require 'rails_helper'

RSpec.describe UsersController, type: :controller do

    describe "GET :new" do 
      it "renders :new template" do 
        get :new, {}  
        expect(response).to render_template(:new)
        expect(response).to have_http_status(200)
      end 
    end

    describe "POST :create" do
      context "with invalid params" do
        it "validates the presence of email and password" do
            post :create, params: { users: { email: "", password: ""} }

            expect(response).to render_template('new')
            expect(flash[:errors]).to be_present
        end

        it "validates that password is min 6 characters long" do
            post :create, params: { users: { email: "hey@oh.com", password: "12345"}}

            expect(response).to render_template('new')
            expect(flash[:errors]).to be_present
        end
      end

       context "with valid params" do 
        it "redirects new user to bands index on success" do
            post :create, params: { users: { email: "cake@batter.com", password: "123456"}}

            expect(response).to redirect_to('/bands')
            expect(response).to have_http_status(302)
        end
       end
    end
end
