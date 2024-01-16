class Profile < ApplicationRecord
    has_one_attached :photo

    validates :name, :username, presence: true
    
    belongs_to :user
end
