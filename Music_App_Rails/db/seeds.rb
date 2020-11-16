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

ActiveRecord::Base.connection.reset_pk_sequence!("albums")
ActiveRecord::Base.connection.reset_pk_sequence!("bands")
ActiveRecord::Base.connection.reset_pk_sequence!("tracks")
ActiveRecord::Base.connection.reset_pk_sequence!("users")

#users
50.times do 
  email = Faker::Internet.email
  password = Faker::Internet.password(min_length: 6)
  activated = true
  User.create(email: email, password: password, activated: activated)
end

#bands
50.times do
  name = Faker::Music.band
  Band.create(name: name)
end

#albums
100.times do 
  name = Faker::Music::PearlJam.album
  year = rand(1900..2020)
  band_id = rand(1..50)
  live = Faker::Boolean.boolean(true_ratio: 0.1)
  Album.create(name: name, year: year, band_id: band_id, live: live)
end

#songs
500.times do
  title = Faker::Music::GratefulDead.song
  album_id = rand(1..100)
  ord = rand(1..50)
  bool = Faker::Boolean.boolean(true_ratio: 0.1)

  Track.create(title: title, ord: ord, album_id: album_id, bonus: bool)
end

#notes

1000.times do
  track_id = rand(1..500)
  user_id = rand(1..50)
  note = Faker::Lorem.sentence(word_count: 4)

  Note.create(track_id: track_id, user_id: user_id, note: note)
end
