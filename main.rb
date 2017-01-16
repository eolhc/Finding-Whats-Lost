require 'pry'
require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/json'
# require 'json'

require_relative 'config/db_config'

require_relative 'models/location'
require_relative 'models/node'




get '/' do

  #using node ID i want to retrieve the location



  erb :index
end


get '/search' do

  node = Node.find(params[:searched_node])
  data_space = node.tag_location_id
  # data_space = Location.find(tag_loc_id)
  # chicken = data_space

  response = {
    :data_space => data_space,
  }

  json response
end
