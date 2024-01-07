class SessionsController < ApplicationController

    #login
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            session[:username] = user.username
            cookies[:user_id] = user.id
            cookies[:username] = user.username
            render json: user, status: :created
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    #logout
    def destroy
        session.delete(:user_id)
        head :no_content
    end

end
