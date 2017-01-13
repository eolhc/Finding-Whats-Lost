require 'pry'
require 'sinatra'
require 'sinatra/reloader'
require 'httparty'

require_relative 'db_config'
require_relative 'models/location'


get '/' do

  #using node ID i want to retrieve the location id



  erb :index
end

post '/' do

end
