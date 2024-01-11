class CommentSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :text, :likes, :datetime

    belongs_to :game
    belongs_to :user
end