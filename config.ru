require 'rack/jekyll'
require 'rack-ssl-enforcer'
require 'yaml'

use Rack::SslEnforcer, except_environments: 'development'
run Rack::Jekyll.new
