class HomeController < ApplicationController
  def index
  end

  def test_d3
    render json: [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
        11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 5,6,8 ]
  end
end
