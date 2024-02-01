class UserProfileSerializerSerializer < ActiveModel::Serializer
  attributes :id, :dob, :bio, :photo, :games_played

  def photo
    Rails.application.routes.url_helpers.rails_blob_url(object.photo, only_path: true) if object.photo.attached?
  end

end
