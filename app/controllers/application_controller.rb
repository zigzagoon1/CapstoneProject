class ApplicationController < ActionController::API
  include ActionController::Cookies
#rescue_from ActiveRecord::RecordInvalid, with: :render_not_valid_response
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def phaser 
    
  end

  private

  def render_not_valid_response
    render json: {errors: "Record is invalid"}, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: {errors: "Record Not Found!"}, status: :not_found
  end
  
end
