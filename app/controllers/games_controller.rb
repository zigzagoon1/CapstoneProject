class GamesController < ApplicationController

    def index
        games = Game.all
        render json: games
    end

    def show

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
end
