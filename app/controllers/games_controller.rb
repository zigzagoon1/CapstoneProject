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
        render json: comment, status: :created
    end

    def update_comment
        comment = Comment.find(params[:comment_id])
        comment.update(update_comment_params)
        render json: comment
    end

    def destroy_comment
        comment = Comment.find(params[:comment_id])
        comment.destroy
        head :no_content
    end

    def create

    end

    def update
        game = Game.find_by(id: params[:id])
        game.update(game_params)  
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
