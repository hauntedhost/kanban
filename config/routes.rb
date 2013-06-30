Kanban::Application.routes.draw do
  root :to => "Boards#index"

  resources :boards, :only => [:index, :show]

  resource :session, :only => [:new, :create, :destroy]
  get "login" => "Sessions#new"
  get "logout" => "Sessions#destroy"

  resources :users, :only => [:create]
  get "signup" => "Users#new"

end
