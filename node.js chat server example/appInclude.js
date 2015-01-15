var fs = require("fs");
var url = require("url");

exports.createApp = function(express){
	var options = {
		
	};

	var app = express();
	app.get('/', function(req, res){ 
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log('Request from %s', ip);
		
		res.send('Welcome to NodeJS Express Server.');
	});
	app.get('/*', function(req, res){
		console.log('Request url is ' + req.originalUrl);
		
		var uri = url.parse(req.url);
		console.log('pathname: ' + uri.pathname);
		
		if(uri.pathname.length > 0){
			//hello.txt and more file
			var fname = uri.pathname.substring(1);
			fs.exists(fname, function(exists){
				if(exists){
					var html = fs.readFileSync(fname);
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(html);
				}else{
					res.writeHead(404);
					res.end("FileNotFound");
				}
			});
		}else{
			res.writeHead(404);
			res.end("PageNotFound");
		}
	});
	console.log(__dirname);
	app.use(express.static(__dirname));
	return app;
};