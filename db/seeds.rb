# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Image.create(name: "Cat Playing Banjo", src: "../client/public/Images/banjo-cat.png", alt: "Cat playing the banjo", scale: 60)
Image.create(name: "Baby Elephant", src: "../client/public/Images/baby-elephant.png", alt: "Baby Elephant", scale: 100)
Image.create(name: "Bananas", src: "../client/public/Images/bananas.png", alt: "Bananas", scale: 140)
Image.create(name: "Cat and Heart", src: "../client/public/Images/cat-cute-heart.png", alt: "Cat and heart", scale: 95)
Image.create(name: "Cherries", src: "../client/public/Images/cherry.png", alt: "cherries", scale: 100)
Image.create(name: "Rainbow Butterfly", src: "../client/public/Images/butterfly-rainbow.png", alt: "Rainbow Butterfly", scale: 100)
Image.create(name: "Blue Crystals", src: "../client/public/Images/crystals.png", alt: "Blue crystals", scale: 75)
Image.create(name: "Rainbow Mandala", src: "../client/public/Images/mandala-rainbow.png", alt: "Rainbow mandala", scale: 90)
Image.create(name: "White Moth", src: "../client/public/Images/moth-white.png", alt: "White moth", scale: 100)
Image.create(name: "Tree", src: "../client/public/Images/tree.png", alt: "Tree", scale: 100)
Image.create(name: "Circle of People", src: "../client/public/Images/people-circle.png", alt: "People Circle", scale: 100)
Image.create(name: "Full Moon", src: "../client/public/Images/full-moon.png", alt: "Full moon", scale: 100)
Image.create(name: "Butterfly", src: "../client/public/Images/butterfly-stained-glass.png", alt: "Butterfly", scale: 100)
Image.create(name: "Forget-Me-Not", src: "../client/public/Images/forget-me-not.png", alt: "Forget-me-not", scale: 100)
Image.create(name: "Rainbow", src: "../client/public/Images/rainbow.png", alt: "Rainbow", scale: 100)
Image.create(name: "Black X", src: "../client/public/Images/Black_X.png", alt: "Black X", scale: 100)
Image.create(name: "Black O", src: "../client/public/Images/Black_o.png", alt: "Black O", scale: 100)

Image.create(name: "TicTacToePreview", src: "../client/public/Images/TicTacToePreview.png", alt: "TicTacToe Preview Image", scale: 100)

main_user = User.create!(name: "Kelly", username: "zigzag", password: "greenday")

if main_user.persisted?
    profile = Profile.create(user_id: main_user.id)

    if profile.persisted?
        photo_path = Rails.root.join('lib', 'assets', 'rainbow-cats.png')
        profile.photo.attach(io: File.open(photo_path), filename: 'rainbow-cat.png', content_type: 'image/png')
    else
        puts "Failed to create profile for user."
    end
else
    puts "Failed to create main user."
end


#User.create(name: "Test", username: "Test", bio: "test", photo: "", dob: "", games_played: 1, password: "test" )

Game.create(name: "Memory Game", genre: "Casual", description: "Flip the cards over and try to match two of the same image! You'll have to remember where the matching image is located.", rating: 4.5)
Game.create(name: "Tic Tac Toe", genre: "Casual", description: "Choose your side- X's or O's, and try to get three in a row!", rating: 4.5)

Comment.create(user_id: 1, game_id: 2, text: "I hope you're enjoying the games!", likes: 1, datetime: "January 1, 2024 12:00")
#Comment.create(user_id: 2, game_id: 2, text: "Test second user comment", likes: 1, datetime: "January 6, 2024")
