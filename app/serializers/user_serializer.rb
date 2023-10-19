class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :games, :photo, :bio, :games_played

  has_many :games, serializer: UserGamesSerializer
end
