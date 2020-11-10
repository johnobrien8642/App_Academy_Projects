# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


u1 = User.create(email:"amigo@badhombre.com", password:"ayepapi")
u2 = User.create(email:"howabowdat@cashmeoutside.com", password:"badbhabi")
u3 = User.create(email:"joejonas@thejonasbros.com", password:"tiddlywinks")

b1 = Band.create(name:"The Plonking Widgets")
b2 = Band.create(name:"Get Back! A Beatles Tribute")
b3 = Band.create(name:"Silverback Gorilla Dollars")
b4 = Band.create(name:"Saddam Hussein")
b5 = Band.create(name:"War in Indonesia?")

a1 = Album.create(name:"Total Destruction", year: 2005, band_id: b1.id)
a2 = Album.create(name:"I'll Take Two, Please", year: 1988, band_id: b2.id)
a3 = Album.create(name:"Jerry Minded", year: 1999, band_id: b3.id)
a4 = Album.create(name:"The Blood of the Innocent", year: 2008, band_id: b4.id)
a5 = Album.create(name:"Peace Or Nothing", year: 1976, band_id: b5.id)