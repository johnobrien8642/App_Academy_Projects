class NotesController < ApplicationController
    before_action :require_user!
    
    def create
      note = Note.new(
          user_id: current_user.id,
          track_id: params[:notes][:track_id],
          note: params[:notes][:note]
      )

      if note.save
        redirect_to track_url(note.track_id)
      else
        flash[:errors] = note.errors.full_messages
        redirect_to track_url(note.track_id)
      end
    end


    def destroy
      @note = Note.find(params[:id])
      if current_user.id == @note.user_id
        @note.destroy
        redirect_to track_url(@note.track_id)
      else
        render text: "You may only delete your own notes"
        redirect_to track_url(@note.track_id)
      end
    end

    private 

    def note_params
      params.require(:notes).permit(:user_id, :track_id, :note)
    end
end