Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'subs#index'

  resources :users do 
    resources :subs, only: [ :new ]
  end
  
  resources :subs do
    member do 
      post 'subscribe'
      post 'unsubscribe'
    end
  end

  resources :posts, only: [ :create, :show, :edit, :update, :destroy ] do
    resources :comments, only: [ :new ]
    member do
      post 'upvote'
      post 'downvote'
    end
  end

  resources :comments, only: [ :create, :destroy, :show ] do
    member do
      post 'upvote'
      post 'downvote'
    end
  end
  
  resource :session, only: [ :new, :create, :destroy ]
end
