app.factory('CommentFactory', function($http){
  var factory = {};
  factory.index = function(callback){
  		$http.get('/comments').then(callback);
  	}
  factory.create = function(newComment,callback){
    console.log("in comment factory");
    console.log(newComment);
    $http.post('/comments',newComment).then(callback);
  }
  factory.updateLikes = function(comment_id, user_id, callback){
  		$http.put('/comments/' + comment_id + '/likes', { user: user_id }).then(callback);
  	}

  factory.destroy = function(id, callback){
		$http.delete('/comments/' + id).then(callback);
	}

  return factory;
})
