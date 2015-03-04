Kanban::Application.routes.draw do

  root to: "Root#index"
  resource :root, only: [:index]

  get "ember" => "root#ember"

  resource :session, only: [:new, :create, :destroy]
  get "login" => "Sessions#new"
  get "logout" => "Sessions#destroy"

  namespace :api do

    resources :users, only: [:show] do
      collection do
        get :current
      end
    end

    resources :boards, only: [:index, :show, :create, :update]

    resources :lists , except: [:edit] do
      collection do
        post :sort
      end
    end

    resources :cards, except: [:edit] do
      collection do
        post :sort
      end
    end

    resources :card_comments, only: [:index, :create, :destroy]
  end
end
