Kanban::Application.routes.draw do

  root :to => "Root#index"
  resource :root, :only => [:index]

  resource :session, :only => [:new, :create, :destroy]
  get "login" => "Sessions#new"
  get "logout" => "Sessions#destroy"

  resources :users, :only => [:create]
  get "signup" => "Users#new"

  namespace :api do
    resources :boards, :only => [:index, :show, :create]
    resources :lists , :only => [:index, :show, :sort] do
      collection do
        post :sort
      end
    end
    resources :cards, :only => [:index, :show, :sort] do
      collection do
        post :sort
      end
    end
  end
end
