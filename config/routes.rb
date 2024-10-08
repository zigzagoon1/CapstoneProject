Rails.application.routes.draw do
  #namespace :api do
    resources :games
    resources :comments, only: [:index]
    resources :images, only: [:index, :show]
    resources :users
    resources :profiles, only: [:index, :show]

    get '/phaser.min.js', to: 'application#phaser'
    get '/me', to: 'users#show'
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/games/:id/comments', to: 'games#comments'
    post '/games/:id/comments', to: 'games#create_comment'
    patch '/games/:id/comments/:comment_id', to: 'games#update_comment'
    delete '/games/:id/comments/:comment_id', to: 'games#destroy_comment'
    get '/users/:id/profile', to: 'profiles#show'
    patch '/users/:id/profile', to: 'profiles#update'
  #end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  #get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
