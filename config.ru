require 'rack'
require 'rack/jekyll'
require 'rack-ssl-enforcer'
require 'yaml'

use Rack::SslEnforcer, except_environments: 'development'
run Rack::Jekyll.new

use Rack::HostRedirect, {
  'elend-refi.com' => 'https://planb-landing-windows.azurewebsites.net',
  'elend-review.com' => { host: 'https://planb-landing-windows.azurewebsites.net', path: '/landing2', query: nil }
}
