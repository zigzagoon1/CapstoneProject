class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username

  has_many :games, serializer: UserGamesSerializer


end
