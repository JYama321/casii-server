class CreateLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :logs do |t|
      t.integer :contract_id
      t.integer :start_block
      t.integer :end_block

      t.timestamps
    end
  end
end
