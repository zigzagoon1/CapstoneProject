class User < ApplicationRecord
    has_secure_password
    validates :name, presence: true, length: {minimum: 2, maximum: 25}, 
    has_many :comments
    has_many :games, through: :comments
end
