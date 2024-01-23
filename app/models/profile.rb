class Profile < ApplicationRecord
    has_one_attached :photo
    
    validates :games_played, uniqueness: true

    belongs_to :user
end
