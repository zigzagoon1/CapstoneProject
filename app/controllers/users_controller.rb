class UsersController < ApplicationController
before_action :authorize, only: [:update, :destroy]
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user
    end

    def create
        user = User.create!(user_create_params)
        if !User.find_by(username: user.username)
            if user.valid?
                session[:user_id] = user.id
                render json: user, status: :created
            else
                render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {errors: "Username already exists!"}, status: :unprocessable_entity
        end
    end

    def update
        user = User.find_by(username: session[:username])
        user.update(user_params_for_update)
        render json: user, status: :ok
    end

    def destroy

    end




    private 

    def user_create_params 
        params.permit(:name, :username, :password, :password_confirmation)
    end

    def user_params_for_update
        params.permit(:name, :bio, :dob, :photo)
    end

    def user_profile_params
    end

end
