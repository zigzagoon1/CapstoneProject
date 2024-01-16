class CommentsController < ApplicationController

    def index
        comments = Comment.all
        render json: comments, status: :ok
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, status: :ok
    end

    private 

    def comment_params
        params.permit(:text, :likes, :datetime)
    end

    def comment_update_params
        params.require(:comment).permit(:text, :likes)
    end


    def authorize
        render json: {error: "Not authorized", status: :unathorized} unless session.include? :user_id
    end

    def render_not_valid_response
        render json: {errors: comments.errors.full_messages}, status: :unprocessable_entity
      end

end
