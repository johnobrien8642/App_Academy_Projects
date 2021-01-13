module ApplicationHelper
  include ERB::Util
  
  def auth_token 
    "<input type='hidden'
           name='authenticity_token' 
           value='#{form_authenticity_token}'>".html_safe
  end

  def ugly_lyrics(lyrics)
    unless lyrics.nil?
      formatted = ""
      lyrics.each_line do |line|
        formatted += "&#9835; " + h(line) 
      end
      
      "<pre><p>#{formatted}</p></pre>".html_safe
    end
  end
end
