# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_30_075137) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.text "name", null: false
    t.text "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.text "key", null: false
    t.text "filename", null: false
    t.text "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.text "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "books", id: false, force: :cascade do |t|
    t.integer "title_id"
    t.text "barcode", null: false
    t.text "condition"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "notes"
    t.boolean "availability"
    t.index ["barcode"], name: "index_books_on_barcode", unique: true
    t.index ["title_id"], name: "index_books_on_title_id"
  end

  create_table "cards", id: false, force: :cascade do |t|
    t.integer "uid"
    t.datetime "expiration_date"
    t.text "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id", null: false
    t.index ["uid"], name: "index_cards_on_uid", unique: true
    t.index ["user_id"], name: "index_cards_on_user_id"
  end

  create_table "loans", force: :cascade do |t|
    t.integer "loaned_by_id"
    t.integer "lent_by_id"
    t.text "book_id"
    t.date "returned_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "expiration_date"
    t.index ["book_id"], name: "index_loans_on_book_id"
    t.index ["lent_by_id"], name: "index_loans_on_lent_by_id"
    t.index ["loaned_by_id"], name: "index_loans_on_loaned_by_id"
  end

  create_table "responsibilities", force: :cascade do |t|
    t.integer "subject_id"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["subject_id"], name: "index_responsibilities_on_subject_id"
    t.index ["user_id"], name: "index_responsibilities_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "score"
    t.text "review"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "user_id", null: false
    t.integer "title_id"
    t.index ["title_id"], name: "index_reviews_on_title_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "subjects", force: :cascade do |t|
    t.text "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "titles", force: :cascade do |t|
    t.text "name"
    t.text "isbn"
    t.integer "cost"
    t.text "title_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.text "authors"
    t.text "cover"
    t.decimal "page_count"
    t.text "published_date"
    t.integer "subject_id"
    t.index ["subject_id"], name: "index_titles_on_subject_id"
  end

  create_table "users", id: false, force: :cascade do |t|
    t.bigint "uid"
    t.text "name"
    t.text "email"
    t.text "klass"
    t.integer "role"
    t.text "google_token"
    t.text "photo_path"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uid"], name: "index_users_on_uid", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
