class CommentsController < ApplicationController
rescue from ActiveRecord::RecordNotFound, with: :render_not_found_response
    def show
        comment = Comment.find(params[:id])
        render json: comment, status: :ok
    end

    def create

    end

    def update

    end

    def destroy

    end

    private 

    def comment_params
        params.permit(:user_id, :game_id, :text, :likes)
    end

    def render_not_found_response
        render json: {errors: "Record Not Found!"}, status: :not_found
    end
end
