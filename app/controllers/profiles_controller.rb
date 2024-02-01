class ProfilesController < ApplicationController

    def index
        profiles = Profile.all
        render json: profiles
    end

    def show
        profile = Profile.find_by(id: params[:id])
        render json: profile
    end

    def update
        profile = Profile.find_by(user_id: [session[:user_id]])
        puts profile
        if params[:photo] && params[:photo] != profile.photo
            puts params.inspect
            profile.photo.attach(params[:photo])
        end
        if profile.update(profile_params_for_update)
            render json: profile
        else
            render json: {errors: profile.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private 

    def profile_params_for_update
        params.permit(:bio, :dob, :photo, :games_played)
    end
end
