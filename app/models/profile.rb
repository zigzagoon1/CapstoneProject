class Profile < ApplicationRecord
    has_one_attached :photo

    validates :user_id, presence: true

    belongs_to :user
end
