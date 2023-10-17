class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :photo, :bio, :games_played
end
