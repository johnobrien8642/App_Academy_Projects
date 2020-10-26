# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

c1 = Cat.create(birth_date: "Nov 4th 2015", color: "brown", 
                name: "Sprinkles", sex: "F", 
                description: "A nice cat, probably too nice"
            )
c2 = Cat.create(birth_date: "Nov 5th 2015", color: "white", 
                name: "Cinnamon", sex: "F", 
                description: "This cat loves to jump"
            )
c3 = Cat.create(birth_date: "Nov 6th 2016", color: "black", 
                name: "Furball", sex: "M", 
                description: "Man this cat sure has a lot of fur"
            )
c4 = Cat.create(birth_date: "Nov 7th 2011", color: "orange", 
                name: "Sprinkles", sex: "F", 
                description: "A nice cat, probably too nice"
            )
c5 = Cat.create(birth_date: "Jan 1st 2018", color: "brown", 
                name: "Cato", sex: "M", 
                description: "A young vibrant cat"
            )
