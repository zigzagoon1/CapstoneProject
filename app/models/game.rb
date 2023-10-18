class Game < ApplicationRecord
    validates :name, presence: true
    validates :description, presence: true
    validates :genre, presence: true

    has_many :comments, dependent: :destroy
    has_many :users, through: :comments
end
