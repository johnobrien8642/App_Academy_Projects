require 'rails_helper'

class CheersController < ApplicationController
    before_action :require_user! 
    
    def create
      cheer = Cheer.new(cheer_params)
      user = User.find(params[:user_id])
    
      if cheer.save
        if cheer.celebrator.user_cheers > 0
          flash[:notices] = ["Cheers!"]
          user.decrement!(:user_cheers)
          redirect_to user_url(user)
        else
          flash[:errors] = ["User doesn't have enough cheers!"]
          redirect_to user_url(user)
        end
      else
        flash[:errors] << cheer.errors.full_messages
        redirect_to user_url(user)
      end
    end

    private

    def cheer_params
      params.require(:cheer).permit(:celebrator_id, :cheerable_type, :cheerable_id)
    end
end