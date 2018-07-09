class CreateSeats < ActiveRecord::Migration[5.2]
  def change
    create_table :seats do |t|
      t.integer :number_seat

      t.timestamps
    end
  end
end
