class UsersController < ApplicationController

    def index
        users = User.all
        render json: user, include: {:comments, :games}
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

    def user_params 
        params.permit(:name, :username, :bio, :photo, :dob, :games_played)
    end
end
