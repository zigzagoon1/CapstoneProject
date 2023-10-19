class User < ApplicationRecord
    has_secure_password

    validates :name, presence: true, length: {minimum: 2, maximum: 25}
    validates :username, uniqueness: true
    #validates :password, presence: true, length: {minimum: 8, maximum: 20}

    has_many :comments
    has_many :games, through: :comments
end
