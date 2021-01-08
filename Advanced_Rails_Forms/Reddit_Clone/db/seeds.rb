# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Sub.destroy_all
Post.destroy_all
PostSub.destroy_all
Comment.destroy_all
Vote.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!("users")
ActiveRecord::Base.connection.reset_pk_sequence!("subs")
ActiveRecord::Base.connection.reset_pk_sequence!("posts")
ActiveRecord::Base.connection.reset_pk_sequence!("post_subs")
ActiveRecord::Base.connection.reset_pk_sequence!("comments")
ActiveRecord::Base.connection.reset_pk_sequence!("votes")



#users
10.times do
    email = Faker::Internet.email
    password = Faker::Internet.password
    User.create(email: email, password: password)
end

#subs
20.times do
    title = Faker::Lorem.sentence
    description = Faker::Lorem.paragraph(sentence_count: 3)
    creator_id = rand(1..10)
    Sub.create(title: title, description: description, creator_id: creator_id)
end

#post votes
100.times do
    user_id = rand(1..10)
    value = [1, -1].sample
    votable_type = "Post"
    votable_id = rand(1..30)

    Vote.create(user_id: user_id, value: value, 
        votable_type: votable_type, votable_id: votable_id)
end

#comment votes
100.times do 
    user_id = rand(1..10)
    value = [1, -1].sample
    votable_type = "Comment"
    votable_id = rand(1..100)

    Vote.create(user_id: user_id, value: value, 
        votable_type: votable_type, votable_id: votable_id)
end

#posts
30.times do
    title = Faker::Lorem.sentence
    url = Faker::Internet.url
    content = Faker::Lorem.paragraph(sentence_count: 3)
    rand_arr_length = rand(1..10) 
    sub_ids = Set.new
    until sub_ids.length == rand_arr_length
        sub_ids << rand(1..20)
    end
    author_id = rand(1..10)
    Post.create(title: title, url: url, content: content, 
        sub_ids: sub_ids.to_a, author_id: author_id) 
end

#parent comments
50.times do
    content = Faker::Lorem.paragraph(sentence_count: 3)
    author_id = rand(1..10)
    post_id = rand(1..30)

    Comment.create(content: content, author_id: author_id, post_id: post_id)
end

#child comments
100.times do
    content = Faker::Lorem.paragraph(sentence_count: 3)
    author_id = rand(1..10)
    post_id = rand(1..30)
    parent_comment_id = rand(1..150)

    Comment.create(content: content, author_id: author_id, 
        post_id: post_id, parent_comment_id: parent_comment_id)
end




