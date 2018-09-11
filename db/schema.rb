# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_31_043302) do

  create_table "logs", force: :cascade do |t|
    t.integer "contract_id"
    t.integer "start_block"
    t.integer "end_block"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "finished", default: false
    t.string "fail_t_hash"
  end

  create_table "transactions", force: :cascade do |t|
    t.string "t_hash", limit: 20
    t.integer "user_id"
    t.integer "t_send"
    t.integer "t_get"
    t.integer "t_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "address", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "invitation_code"
    t.integer "#<ActiveRecord::ConnectionAdapters::SQLite3::TableDefinition:0x00007fb133b043c0>"
    t.index ["address"], name: "index_users_on_address", unique: true
    t.index ["invitation_code"], name: "index_users_on_invitation_code", unique: true
  end

end
