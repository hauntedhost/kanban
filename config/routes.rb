Kanban::Application.routes.draw do

  root :to => "Root#index"
  resource :root, :only => [:index]

  resource :session, :only => [:new, :create, :destroy]
  get "login" => "Sessions#new"
  get "logout" => "Sessions#destroy"

  resources :users, :only => [:show]

  namespace :api do
    resources :users, :only => [:show]
    resources :boards, :only => [:index, :show, :create]
    resources :lists , :only => [:index, :show, :create, :destroy] do
      collection do
        post :sort
      end
    end
    resources :cards, :only => [:index, :show, :create, :destroy] do
      collection do
        post :sort
      end
    end
  end
end
