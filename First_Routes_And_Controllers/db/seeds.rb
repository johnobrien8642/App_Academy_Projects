# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create!(username: "Tully")
u2 = User.create!(username: "Frankfurt")
u3 = User.create!(username: "An_Anime_Character")

a1 = Artwork.create!(artist_id: u1.id, title: "Big balls", image_url: "abc.com/1")
a2 = Artwork.create!(artist_id: u2.id, title: "Big boys", image_url: "abc.com/2")
a3 = Artwork.create!(artist_id: u3.id, title: "Big bones", image_url: "abc.com/3")

aws1 = ArtworkShare.create!(artwork_id: a1.id, viewer_id: u1.id)
aws2 = ArtworkShare.create!(artwork_id: a2.id, viewere_id: u2.id)
