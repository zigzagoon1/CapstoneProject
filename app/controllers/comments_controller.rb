class CommentsController < ApplicationController
before_action :authorize, only: [:create, :update, :destroy]
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


    def authorize
        render json: {error: "Not authorized", status: :unathorized} unless session.include? user_id
    end
end
