var express = require('express');
var app = express();
var bp = require('body-parser');

app.use(bp.json());
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/bower_components'));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(3000,function(){
  console.log('listening on port 3000...');
})
