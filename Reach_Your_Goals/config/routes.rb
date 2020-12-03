Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:new, :create, :show, :destroy] do
    resources :goals, only: [:new] 
    resources :comments, only: [:create]
  end

  resources :goals, only: [:index, :create, :show, :edit, :update, :destroy] do
    resources :comments, only: [:create]
    member do
      post :toggle_completed 
    end
  end

  resources :comments, only: [:create, :edit, :update, :destroy]

  resource :session, only: [:new, :create, :destroy]
end
