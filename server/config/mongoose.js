var mongoose = require('mongoose');

var fs  = require('fs');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Wall').then(
	function(){
		console.log("Connected to db");
	},
	function(){
		console.log('FAILED TO CONNECT TO DB');
	}
);

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') != -1){
		console.log('loading ' + file + '...');
		require(models_path + '/' + file);
	}
});
