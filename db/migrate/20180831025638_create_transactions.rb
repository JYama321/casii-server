class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :t_hash, :limit => 255
      t.references :user, :foreign_key => true
      t.float :t_send
      t.float :t_get
      t.integer :t_time

      t.timestamps
    end
  end
end
