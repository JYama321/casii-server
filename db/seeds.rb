# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Log.create(contract_id: 1, start_block: 1, end_block: 1000)


100.times do |i|
  User.create(address: "0x5ebe9c8e69144a5822f88ea1437f14bb85f53#{sprintf("%03d",i)}")
end


100.times do |user_id|
  10.times do |tx_id|
    Transaction.create(t_hash: "0xce0924f6ac9f2dfcd06700a803eebaa9fb7481771d01ca7247a36efb780481fa", t_send: 1000000000000000000, t_get: 1900000000000000000, user_id: user_id)
  end
end