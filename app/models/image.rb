class Image < ApplicationRecord
    validates :src, presence: true
    validates :alt, presence: true
    validates :scale, presence: true
end
