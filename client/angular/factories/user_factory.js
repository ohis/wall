app.factory('UserFactory', function($http, $cookies){
	var factory = {};

	factory.create = function(newUser, callback){
		$http.post('/users', newUser).then(callback);
	}
	factory.session = function(callback){
		console.log("got to user session factory")
		var user_id = $cookies.get('user_id');
		if(!user_id){
			return callback(false);
		}
		$http.get('/users/' + user_id).then(function(res){
			if(res.data.errors){
				return callback(false)
			}
			console.log(res.data);
			return callback(res.data);
		})
	}
	factory.login = function(loginUser, callback){
		$http.post('/sessions', loginUser).then(callback);
	}

	return factory;
});
