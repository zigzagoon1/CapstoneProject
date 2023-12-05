class ImagesController < ApplicationController
    def index
        images = Image.all
        render json: images, status: :ok
    end

    def show
        image = Image.find_by(name: params[:name])
        render json: image, status: :ok
    end


    private

    def image_params
        params.permit(:src, :alt, :scale)
    end
end
