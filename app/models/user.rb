class User < ApplicationRecord
    has_secure_password
    
    validates :name, presence: true, length: {minimum: 2, maximum: 25}
    validates :username, uniqueness: true

    #For some reason, when I have this line uncommented, trying to update user results in an unprocessable_entity status and you can't change profile photo; even when excluding
    #presence: true, I get the same result
    #validates :password, presence: true, length: {minimum: 2, maximum: 20}

    has_many :comments
    has_many :games, through: :comments
    has_one :profile
end
