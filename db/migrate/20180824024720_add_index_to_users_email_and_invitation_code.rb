class AddIndexToUsersEmailAndInvitationCode < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :address, unique: true
    add_index :users, :invitation_code, unique: true
  end
end
