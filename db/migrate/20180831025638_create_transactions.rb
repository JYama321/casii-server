class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :t_hash, :limit => 255
      t.references :user, :foreign_key => true
      t.integer :t_send
      t.integer :t_get
      t.integer :t_time

      t.timestamps
    end
  end
end
