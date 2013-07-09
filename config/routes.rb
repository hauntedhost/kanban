Kanban::Application.routes.draw do

  root :to => "Root#index"
  resource :root, :only => [:index]

  resource :session, :only => [:new, :create, :destroy]
  get "login" => "Sessions#new"
  get "logout" => "Sessions#destroy"

  resources :users, :only => [:show]

  namespace :api do

    resources :users, :only => [:show] do
      collection do
        get :current
      end
    end

    resources :boards, :only => [:index, :show, :update]

    resources :lists , :except => [:edit] do
      collection do
        post :sort
      end
    end

    resources :cards, :except => [:edit] do
      collection do
        post :sort
      end
    end

    resources :card_comments, :only => [:create, :destroy]
  end
end
