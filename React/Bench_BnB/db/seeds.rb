# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Bench.delete_all
User.delete_all

ActiveRecord::Base.connection.reset_pk_sequence!("users")
ActiveRecord::Base.connection.reset_pk_sequence!("benches")


b1 = Bench.create!(
  description: 'alamo square, many dogs',
  lat: 37.775769,
  lng: -122.434960,
  seating: 2,
  picture_url: 'https://www.thebenchfactory.com/media/catalog/product/cache/1de18e47886e8a56e4b449f2e3cefe99/G/T/GTB400__OL_BK.jpg'
)

b2 = Bench.create!(
  description: 'UN plaza, food truck access',
  lat: 37.779760,
  lng: -122.413820,
  seating: 5,
  picture_url: 'https://www.thebenchfactory.com/media/catalog/product/cache/1de18e47886e8a56e4b449f2e3cefe99/G/T/GTB400__OL_BK.jpg'
)

Bench.create!(
  description: 'Ocean Beach, gnarly breh',
  lat: 37.769996,
  lng: -122.511281,
  seating: 4,
  picture_url: 'https://www.thebenchfactory.com/media/catalog/product/cache/1de18e47886e8a56e4b449f2e3cefe99/G/T/GTB400__OL_BK.jpg'
)

u1 = User.create!(
  username: 'guest',
  password: 'password'
)

u2 = User.create!(
  username: 'username',
  password: 'password'
)