class Comment < ApplicationRecord
    validates :text, presence: true, length: {minimum: 1, maximum: 500}

    belongs_to :user
    belongs_to :game
end
