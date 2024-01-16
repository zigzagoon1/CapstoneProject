class GamesController < ApplicationController

    def index
        games = Game.all
        render json: games
    end

    def show
        game = Game.find_by(id: params[:id])
        render json: game, status: :ok
    end
    
    def comments
        game = Game.find(params[:id])
        comments = game.comments
        render json: comments
    end

    def create_comment
        game = Game.find_by(id: params[:id])
        comment = Comment.create(create_comment_params)
        comment.game_id = game.id
        comment.user_id = session[:user_id]
        comment.save
        if comment.valid?
            render json: comment, status: :created
        else
            render json: {errors: comment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update_comment
        comment = Comment.find(params[:comment_id])
        if session[:user_id] == comment.user_id || params[:likes] != comment.likes
            if comment.update(update_comment_params)
                render json: comment
            else
                render json: {errors: "Comment invalid"}, status: :unprocessable_entity
            end
        else
            render json: {errors: "Unauthorized"}, status: :unauthorized
        end
    end

    def destroy_comment
        comment = Comment.find(params[:comment_id])
        if session[:user_id] == comment.user_id
            comment.destroy
            head :no_content
        else
            render json: {errors: "Unauthorized"}, status: :unauthorized
        end
    end

    def create

    end

    def update

    end

    def destroy

    end

    private

    def game_params 
        params.permit(:name, :genre, :description, :rating)
    end

    def create_comment_params
        params.permit(:text, :likes, :datetime)
    end 
    
    def update_comment_params
        params.permit(:text, :likes)
    end
end
