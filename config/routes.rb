Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get root 'ethereum#index'
  post '/user/new', to: 'users#create'
  get '/ethereum/jp', to: 'ethereum#jackpot_ajax'
  post '/ethereum/jp', to: 'ethereum#jackpot_ajax'
end
