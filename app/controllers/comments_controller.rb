class CommentsController < ApplicationController
before_action :authorize, only: [:create, :update, :destroy]

    def index
        comments = Comment.all
        render json: comments, status: :ok
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, status: :ok
    end

    def create
        comment = Comment.create!(comment_params)
        #comment.user_id = session[:user_id]
        render json: comment, status: :created
    end

    def update
        
    end

    def destroy

    end

    private 

    def comment_params
        params.permit(:user_id, :game_id, :text, :likes, :datetime)
    end


    def authorize
        render json: {error: "Not authorized", status: :unathorized} unless session.include? :user_id
    end

    def render_not_valid_response
        render json: {errors: comments.errors.full_messages}, status: :unprocessable_entity
      end

end
