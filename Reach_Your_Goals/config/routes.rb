Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:new, :create, :show, :destroy]
  resources :goals, only: [:index, :new, :create, :edit, :update, :destroy]
  resource :session, only: [:new, :create, :destroy]
end
