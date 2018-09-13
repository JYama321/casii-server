class AddIndexToUsersEmailAndInvitationCode < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :address, unique: true, :name => 'address_index'
  end
end
