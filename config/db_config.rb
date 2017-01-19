require 'active_record'

options = {
  adapter: 'postgresql',
  database: 'lost_things'
}

ActiveRecord::Base.establish_connection(options)

#
# ActiveRecord::Base.establish_connection(
#   :adapter => "mysql",
#   :host => "192.168.15.4",
#   :username => "datasam_admin",
#   :password => "datasam",
#   :database => "asset_tracking"
# )
