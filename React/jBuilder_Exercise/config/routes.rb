Rails.application.routes.draw do
  # Your routes here!

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.
  
  namespace :api, defaults: { format: :json } do
    resources :parties, only: [ :show, :index ]
    
    resources :gifts, only: [ :show ]
      resources :guests, only: [ :index, :show ] do
        resources :gifts, only: [ :index ]
      end
  end
end
