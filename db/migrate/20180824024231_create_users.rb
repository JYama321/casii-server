class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :address, :null => false
      t.integer :invitation_code,
      t.timestamps
    end
  end
end
