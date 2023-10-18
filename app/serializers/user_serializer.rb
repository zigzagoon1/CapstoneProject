class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :photo, :bio, :games_played

  has_many :games, serializer: UserGamesSerializer
end
