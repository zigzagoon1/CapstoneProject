Rails.application.routes.draw do
  #namespace :api do
    resources :games
    resources :comments
    resources :images, only: [:index, :show]
    resources :users, only: [:index, :show, :update, :destroy]

    get '/phaser.min.js', to: 'application#phaser'
    get '/me', to: 'users#show'
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
  #end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  #get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
