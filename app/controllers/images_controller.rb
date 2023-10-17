class ImagesController < ApplicationController
    def index
        images = Image.all
        render json: images
    end

    def show

    end

    private

    def image_params
        params.permit(:src, :alt, :scale)
    end
end
