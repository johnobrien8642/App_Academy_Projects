# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Album.destroy_all
Band.destroy_all
Track.destroy_all
User.destroy_all
Tag.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!("albums")
ActiveRecord::Base.connection.reset_pk_sequence!("bands")
ActiveRecord::Base.connection.reset_pk_sequence!("tracks")
ActiveRecord::Base.connection.reset_pk_sequence!("users")
ActiveRecord::Base.connection.reset_pk_sequence!("tags")

# #users
# 50.times do 
#   email = Faker::Internet.email
#   password = Faker::Internet.password(min_length: 6)
#   activated = true
#   admin = Faker::Boolean.boolean(true_ratio: 0.1)
#   User.create(email: email, password: password,
#       activated: activated, admin: admin)
# end

# #bands
# 50.times do
#   name = Faker::Music.band
#   Band.create(name: name)
# end

# #albums
# 100.times do 
#   name = Faker::Music::PearlJam.album
#   year = rand(1900..2020)
#   band_id = rand(1..50)
#   live = Faker::Boolean.boolean(true_ratio: 0.1)
#   Album.create(name: name, year: year, band_id: band_id, live: live)
# end

# #tracks
# 500.times do
#   title = Faker::Music::GratefulDead.song
#   album_id = rand(1..100)
#   ord = rand(1..50)
#   bool = Faker::Boolean.boolean(true_ratio: 0.1)

#   Track.create(title: title, ord: ord, album_id: album_id, bonus: bool)
# end

# #notes
# 1000.times do
#   track_id = rand(1..500)
#   user_id = rand(1..50)
#   note = Faker::Lorem.sentence(word_count: 4)

#   Note.create(track_id: track_id, user_id: user_id, note: note)
# end

# #album tags
# 200.times do 
#   album_id = rand(1..100)
#   album_type = Album
#   tag = Faker::Music.genre

#   Tag.create(tagable_id: album_id, tagable_type: album_type,  tag: tag)
# end

# #track tags 
# 1000.times do 
#   track_id = rand(1..500)
#   track_type = Track
#   tag = Faker::Music.genre

#   Tag.create(tagable_id: track_id, tagable_type: track_type, tag: tag)
# end

# #bands tags
# 100.times do 
#   band_id = rand(1..50)
#   band_type = Band
#   tag = Faker::Music.genre

#   Tag.create(tagable_id: band_id, tagable_type: band_type, tag: tag)
# end