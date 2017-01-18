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

  # assume that this is movement id instead
  node = Node.find(params[:searched_node])
  data_space = node.tag_location_id
  level = Location.find(data_space).level
  # data_space = Location.find(tag_loc_id)
  # chicken = data_space

  response = {
    :data_space => data_space,
    :selected_level => level
  }

  json response
end
