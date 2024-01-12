class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :games, :photo, :bio, :games_played

  has_many :games, serializer: UserGamesSerializer

  def photo
    if object.photo.attached?
      Rails.application.routes.url_helpers.rails_blob_url(object.photo, only_path: true) if object.photo.attached?
    end
  end
end
