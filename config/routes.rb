Rails.application.routes.draw do
  #namespace :api do
    resources :games
    resources :comments
    resources :images, only: [:index]
  #end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  #get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
