require 'active_record'

options = {
  adapter: 'postgresql',
  database: 'asset_tracking'
}

ActiveRecord::Base.establish_connection(options)


# ActiveRecord::Base.establish_connection(
#   :adapter => "mysql",
#   :host => "192.168.15.4",
#   :username => "root",
#   :password => "",
#   :database => "db"
# )
