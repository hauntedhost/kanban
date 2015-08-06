class RootController < ApplicationController
  before_filter :require_login

  def index
    render :index, layout: 'backbone'
  end

  def ember
    render :ember, layout: 'ember'
  end
end
