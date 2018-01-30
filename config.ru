require 'rack'
require 'rack/jekyll'
require 'rack-ssl-enforcer'
require 'yaml'

use Rack::SslEnforcer, except_environments: 'development'
run Rack::Jekyll.new

use Rack::HostRedirect, {
  'elend-review.com' => { host: 'planb-landing-windows.azurewebsites.net', path: '/landing2', query: nil }
  'elend-refi.com' => 'planb-landing-windows.azurewebsites.net',
}
