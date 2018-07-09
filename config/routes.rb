Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  get 'bookings/show'
end
