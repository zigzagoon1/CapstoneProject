class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :dob, :bio, :photo

  def photo
      Rails.application.routes.url_helpers.rails_blob_url(object.photo, only_path: true) if object.photo.attached?
  end
  
end
