# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
console.log("Seeding data...");


Image.create(src: "../client/public/Images/banjo-cat.png", alt: "Cat playing the banjo", scale: 60)
Image.create(src: "../client/public/Images/baby-elephant.png", alt: "Baby Elephant", scale: 100)
Image.create(src: "../client/public/Images/bananas.png", alt: "Bananas", scale: 140)
Image.create(src: "../client/public/Images/cat-cute-heart.png", alt: "Cat and heart", scale: 95)
Image.create(src: "../client/public/Images/cherry.png", alt: "cherries", scale: 100)
Image.create(src: "../client/public/Images/butterfly-rainbow.png", alt: "Rainbow Butterfly", scale: 100)
Image.create(src: "../client/public/Images/crystals.png", alt: "Blue crystals", scale: 75)
Image.create(src: "../client/public/Images/mandala-rainbow.png", alt: "Rainbow mandala", scale: 90)
Image.create(src: "../client/public/Images/moth-white.png", alt: "White moth", scale: 100)
Image.create(src: "../client/public/Images/tree.png", alt: "Tree", scale: 100)
Image.create(src: "../client/public/Images/people-circle.png", alt: "People Circle", scale: 100)
Image.create(src: "../client/public/Images/full-moon.png", alt: "Full moon", scale: 100)
Image.create(src: "../client/public/Images/butterfly-stained-glass.png", alt: "Butterfly", scale: 100)
Image.create(src: "../client/public/Images/forget-me-not.png", alt: "Forget-me-not", scale: 100)
Image.create(src: "../client/public/Images/rainbow.png", alt: "Rainbow", scale: 100)

#User.create(name: "Kelly", username: "zigzag", bio: "Hi, I'm zigzag, the creator of this site!", photo: "", dob: "06/02/1994", games_played: 4, password: "greenday")
Game.create(name: "Memory Game", genre: "Casual", description: "Flip the cards over and try to match two of the same image! You'll have to remember where the matching image is located.", rating: 4.5)
Game.create(name: "Tic Tac Toe", genre: "Casual", description: "Choose your side- X's or O's, and try to get three in a row!", rating: 4.5)

Comment.create(user_id: 1, game_id: 1, text: "I hope you're enjoying the games!", likes: 1)

console.log("Seeding complete!")