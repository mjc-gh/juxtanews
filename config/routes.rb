Juxtanews::Application.routes.draw do
  root controller: :sites, action: :home

  resources :sites, only: [:show, :index] do
    resources :snapshots, only: [:show, :index] do
      get 'latest', on: :collection
    end
  end
end
