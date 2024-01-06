class Comment < ApplicationRecord
    validates :text, presence: true, length: {minimum: 1, maximum: 500}
    validates :datetime, presence: true
    belongs_to :game
    belongs_to :user

end
