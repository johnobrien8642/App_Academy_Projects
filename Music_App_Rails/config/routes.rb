Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:new, :create, :destroy, :show]
  
  resources :albums, only: [:create, :edit, :show, :update, :destroy]

  resources :bands do
    resources :albums, only: [:new]
  end
  
  resource :session, only: [:new, :create, :destroy]
end
