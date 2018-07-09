class SeatMessageJob < ApplicationJob
  queue_as :default

  def perform seat
    available_seat = seat.number_seat - seat.processing_seat
    ActionCable.server.broadcast 'seat_available_message', id: seat.id, number: available_seat
  end
end
