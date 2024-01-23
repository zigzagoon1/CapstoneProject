class UsersController < ApplicationController
before_action :authorize, only: [:update, :destroy]
    def index
        users = User.all
        render json: users
    end

    def show
        if session[:user_id]
            user = User.find_by(id: session[:user_id])
            render json: user, status: :ok
        else
            render json: {errors: "No user logged in"}, status: :unprocessable_entity
        end
    end

    def create
        #signup
        user = User.create!(user_create_params)
        if user.valid?
            session[:user_id] = user.id
            profile = Profile.create(user_id: user.id, bio: "", dob: "", games_played: 0)
            if profile.valid?
                user.profile = profile
                user.save
            else
                render json: {errors: profile.errors.full_messages}, status: :unprocessable_entity
            end
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user.update(user_params_for_update)
            render json: user, status: :ok
        else 
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        user.destroy
        head :no_content
    end




    private 

    def user_create_params 
        params.permit(:name, :username, :password, :password_confirmation)
    end

    def user_params_for_update
        params.permit(:name)
    end

    def authorize
        render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end

end
