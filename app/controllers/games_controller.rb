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
end
