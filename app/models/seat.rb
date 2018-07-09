class Seat < ApplicationRecord
  after_commit :broadcast

  private

  def broadcast
    SeatMessageJob.perform_later self
  end
end
