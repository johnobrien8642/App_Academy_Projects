# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Todo.destroy_all
Step.destroy_all
Tag.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!("todos")
ActiveRecord::Base.connection.reset_pk_sequence!("steps")
ActiveRecord::Base.connection.reset_pk_sequence!("tags")

10.times do
  title = Faker::Lorem.sentence
  body = Faker::Lorem.paragraph(sentence_count: 2)
  done = [ true, false ].sample
  tag_names = []
  5.times do 
    tag = Faker::Lorem.word
    tag_names.push(tag)
  end
  Todo.create(title: title, body: body, tag_names: tag_names, done: done)
end

40.times do
  title = Faker::Lorem.sentence
  body = Faker::Lorem.paragraph(sentence_count: 2)
  done = [ true, false ].sample
  todo_id = rand(1..10)
  Step.create(title: title, body: body, todo_id: todo_id, done: done)
end

# 80.times do
#   name = Faker::Lorem.word
#   Tag.create(name: name)
# end

