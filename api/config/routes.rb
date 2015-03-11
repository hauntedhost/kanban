Kanban::Application.routes.draw do
  # root to: 'ember#index'
  # resource :ember, only: [:index]

  # resource :auth, only: [:new, :create, :destroy]
  # get 'login' => 'auth#new'
  # get 'logout' => 'auth#destroy'

  # resources :users, only: [:show]

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
