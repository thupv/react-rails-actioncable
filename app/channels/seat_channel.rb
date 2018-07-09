class SeatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'seat_available_message'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def fetch_available_seat opts
    seat = Seat.find(opts['id'].to_i)
    SeatMessageJob.perform_later seat if seat
  end

  def take_seat opts
    seat = Seat.find(opts['id'].to_i)
    return if seat.nil?
    seat.processing_seat = seat.processing_seat + opts['noOfSeat'].to_i
    seat.save
    SeatMessageJob.perform_later seat
  end
end
