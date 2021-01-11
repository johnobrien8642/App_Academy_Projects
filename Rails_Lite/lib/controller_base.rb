require 'active_support'
require 'active_support/core_ext'
require 'active_support/inflector'
require 'erb'
require_relative './session'

require 'byebug'

class ControllerBase
  attr_reader :req, :res, :params, :auth_token

  # Setup the controller
  def initialize(req, res, route_params = {})
    @req = req
    @res = res
    @params = route_params.merge(req.params) 
    @already_built_response = false
    @@protect_from_forgery ||= false
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    prepare_render_or_redirect
    
    @res.status = 302
    @res['Location'] = url
    
    nil
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    prepare_render_or_redirect

    @res.write(content)
    @res['Content-Type'] = content_type
  
    nil
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
      dir_path = File.dirname(__FILE__)
      template_fname = File.join(
        dir_path, '..',
        "views", self.class.name.underscore, "#{template_name}.html.erb"
      )

      template_code = File.read(template_fname)

      render_content(
        ERB.new(template_code).result(binding),
        "text/html"
      )
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    if protect_from_forgery? && req.request_method != "GET"
      check_authenticity_token
    else
      form_authenticity_token
    end  
    
    self.send(name)
    render(name) unless already_built_response?
  
    nil
  end

  def self.protect_from_forgery
    @@protect_from_forgery = true
  end

  def protect_from_forgery?
    @@protect_from_forgery
  end

  def prepare_render_or_redirect
    raise "double render error" if already_built_response?
    @already_built_response = true
    session.store_session(@res)
  end

  def form_authenticity_token
    @auth_token ||= generate_random_token
    @res.set_cookie('authenticity_token', value: @auth_token, path: '/')
    @auth_token
  end 

  def check_authenticity_token
    cookie_auth_token = @req.cookies['authenticity_token']
    unless cookie_auth_token && cookie_auth_token == 
        params['authenticity_token']
      raise 'Invalid authenticity token'
    end
  end

  def generate_random_token
    SecureRandom::urlsafe_base64(16)
  end
end

