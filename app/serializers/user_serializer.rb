class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :profile

  has_many :games, serializer: UserGamesSerializer


end
