app.factory('MessageFactory',function($http){
var factory = {};

factory.index = function(callback){
		$http.get('/messages').then(callback);
	}
factory.create = function(newMessage,callback){
  console.log("in message factory");
  console.log(newMessage);
  $http.post('/messages', newMessage).then(callback);
}

factory.destroy = function(id, callback){
		$http.delete('/messages/' + id).then(callback);
	}
return factory;
})
