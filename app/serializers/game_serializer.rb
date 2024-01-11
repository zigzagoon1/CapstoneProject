class GameSerializer < ActiveModel::Serializer
    attributes :id, :name, :genre, :description, :rating

    has_many :comments
    has_many :users, through: :comments
end