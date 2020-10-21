Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:create, :destroy, :index, :show, :update] do
  end

  resources :artworks, only: [:create, :destroy, :index, :show, :update] do 
  end

  resources :artwork_shares, only: [:create, :destroy] do
  end
end
