class EmberController < ApplicationController
  before_filter :require_login

  def index
    render :index
  end

end
