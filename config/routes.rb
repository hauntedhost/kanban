Kanban::Application.routes.draw do
  resources :boards, :only => [:index, :show]

  resource :root, :only => [:index]
  root :to => "Root#index"

  resource :session, :only => [:new, :create, :destroy]
  get "login" => "Sessions#new"
  get "logout" => "Sessions#destroy"

  resources :users, :only => [:create]
  get "signup" => "Users#new"

end
