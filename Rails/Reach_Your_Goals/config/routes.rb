Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:new, :create, :show, :destroy] do
    resources :goals, only: [:new]
  end

  resources :goals, only: [:index, :create, :show, :edit, :update, :destroy] do
    member do
      post :toggle_completed 
    end
  end

  resources :comments, only: [:create, :destroy]

  resources :cheers, only: [:create]

  resource :session, only: [:new, :create, :destroy]
end
