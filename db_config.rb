require 'active_record'

options = {
  adapter: 'postgresql',
  database: 'asset_tracking'
}

ActiveRecord::Base.establish_connection(options)
