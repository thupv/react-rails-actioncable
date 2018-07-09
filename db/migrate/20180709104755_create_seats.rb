class CreateSeats < ActiveRecord::Migration[5.2]
  def change
    create_table :seats do |t|
      t.integer :number_seat, default: 0
      t.integer :processing_seat, default: 0
      t.timestamps
    end
  end
end
