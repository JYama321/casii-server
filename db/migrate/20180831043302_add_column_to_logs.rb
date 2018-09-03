class AddColumnToLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :logs, :finished, :boolean, :default => false
    add_column :logs, :fail_t_hash, :string
  end
end
