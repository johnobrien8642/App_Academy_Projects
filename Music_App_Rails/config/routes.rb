Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:index, :new, :create, :destroy, :show] do
    get 'activate', :on => :member 
    get 'make_admin', :on => :member
  end
  
  resources :albums, only: [:create, :edit, :show, :update, :destroy] do
    resources :tracks, only: [:new]
  end

  resources :tracks, only: [:create, :edit, :show, :update, :destroy] 

  resources :notes, only: [:create, :destroy] 

  resources :bands do
    resources :albums, only: [:new]
  end
  
  resource :session, only: [:new, :create, :destroy]

  resources :searches, only: [:index]
end
