Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get root 'ethereum#index'
  post '/user/new', to: 'users#create'
  get '/ethereum/jp', to: 'ethereum#jackpot_ajax'
  post '/ethereum/jp', to: 'ethereum#jackpot_ajax'
  post '/ethereum/event', to: 'ethereum#event_logs'
  post '/ethereum/ranking/send', to: 'ethereum#aggregate_total_number_of_bet'
end
