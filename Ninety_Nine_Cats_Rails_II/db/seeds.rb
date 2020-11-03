# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create(username:"MsSpanks", password:'lovelyday')
u2 = User.create(username:"DagoDelabo", password:'aaa111232323')
u3 = User.create(username:"Thor99444", password:'jackolantern')


c1 = Cat.create(birth_date: "Nov 4th 2015", color: "brown", 
                name: "Sprinkles", sex: "F", 
                description: "A nice cat, probably too nice",
                user_id: u1.id
            )
c2 = Cat.create(birth_date: "Nov 5th 2015", color: "white", 
                name: "Cinnamon", sex: "F", 
                description: "This cat loves to jump",
                user_id: u1.id
            )
c3 = Cat.create(birth_date: "Nov 6th 2016", color: "black", 
                name: "Furball", sex: "M", 
                description: "Man this cat sure has a lot of fur",
                user_id: u2.id
            )
c4 = Cat.create(birth_date: "Nov 7th 2011", color: "orange", 
                name: "Tinkerbell", sex: "F", 
                description: "This is an outdoor cat",
                user_id: u3.id
            )
c5 = Cat.create(birth_date: "Jan 1st 2018", color: "brown", 
                name: "Cato", sex: "M", 
                description: "A young vibrant cat",
                user_id: u3.id
            )

CatRentalRequest.create(cat_id: c1.id, start_date: "June 1st 2021", 
                            end_date: "June 30th 2021", user_id: u2.id, 
                            status: :PENDING
                        )

CatRentalRequest.create(cat_id: c2.id, start_date: "July 5th 2021", 
                            end_date: "August 8th 2021", user_id: u3.id, 
                            status: :PENDING
                        )                        

CatRentalRequest.create(cat_id: c1.id, start_date: "February 20th 2021", 
                            end_date: "March 5th 2021", user_id: u3.id, 
                            status: :PENDING
                        )

CatRentalRequest.create(cat_id: c4.id, start_date: "April 5th 2021", 
                            end_date: "April 10th 2021", user_id: u1.id, 
                            status: :PENDING
                        )

CatRentalRequest.create(cat_id: c5.id, start_date: "October 1st 2021", 
                            end_date: "October 30th 2021", user_id: u2.id, 
                            status: :PENDING
                        )