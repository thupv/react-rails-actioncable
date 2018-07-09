class SeatMessageJob < ApplicationJob
  queue_as :default

  def perform seat
    ActionCable.server.broadcast 'seat_available_message', id: seat.id, number: seat.number_seat
  end
end
