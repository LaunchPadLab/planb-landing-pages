require 'rack'
# require 'pry'
# require 'rack/jekyll'
require 'rack-ssl-enforcer'
require 'yaml'

use Rack::SslEnforcer, except_environments: 'development'
# run Rack::Jekyll.new

class Routes
  def stay(location, accept, path_info)
    paths = {
      'text' => 'text/html',
      'css' => 'text/css',
      'js' => '/javascript/delay-animation.js',
      'img' => 'image'
    }

    if accept.include? paths['text']
      serve_html(location)
    elsif accept.include? paths['css']
      serve_css
    elsif path_info.include? paths['js']
      serve_js
    else
      serve_images(accept, path_info)
    end
  end

  def serve_html(location)
    files = {
      'elend-refi.local' => '_site/index.html',
      'elend-review.local' => '_site/landing2/index.html'
    }
    file = files[location] || files['/']
    [200, {'Content-Type' => 'text/html'}, [File.read(file)]]
  end

  def serve_css
    [200, {'Content-Type' => 'text/css'}, [File.read('_site/css/main-5.css')]]
  end

  def serve_js
    [200, {'Content-Type' => 'text/js'}, [File.read('_site/javascript/delay-animation.js')]]
  end

  def serve_images(http_accept, path_info)
    [200, {'Content-Type' => http_accept}, [File.read("_site#{path_info}")]]
  end

  def call(env)
    host = env['SERVER_NAME']
    http_accept = env['HTTP_ACCEPT']
    path_info = env['PATH_INFO']
    stay(host, http_accept, path_info)
  end
end

run Routes.new
