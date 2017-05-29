app.controller('MessageController', function($location,$routeParams,UserFactory,MessageFactory,CommentFactory){
var self = this;
self.message = {};
self.messages = [];
self.messages_error = [];
self.comment = {};
self.comments = [];
self.comments_error = [];

self.index = function(){
		MessageFactory.index(function(res){
			self.messages = res.data;

		})
	}

	self.updateCommentLikes = function(comment_id, user_id){
		console.log('here');
		CommentFactory.updateLikes(comment_id, user_id, self.index);
	}

	self.updateLikes = function(message_id, user_id){
		MessageFactory.updateLikes(message_id, user_id, self.index);
	}


	self.destroyComment = function(comment_id){
		CommentFactory.destroy(comment_id, self.index);
	}

	self.destroy = function(message_id){
			MessageFactory.destroy(message_id, self.index);
		}

		self.destroyComment = function(comment_id){
				CommentFactory.destroy(comment_id, self.index);
			}

  self.Commentindex = function(){
    CommentFactory.index(function(res){
      console.log("in comment index");
      console.log(res.data);
      self.comments = res.data;
    })
  }

  self.createComment = function(newComment, index, message_id){
		console.log("creatin controllers comment");
		self.comments_errors = {};
		if(!newComment[index]){
			newComment[index] = {};
		}
		newComment = newComment[index];
		newComment.message = message_id;
		console.log(newComment.message);
		UserFactory.session(function(user){
			newComment.user = user;
      console.log("getting user");
      console.log(newComment.user.name);
			CommentFactory.create(newComment, function(res){
				self.newComment = {};
				if(res.data.errors){
					self.comments_errors[index]= [];
					for(key in res.data.errors){
						var error = res.data.errors[key];
						self.comments_errors[index].push(error.message);
					}
				} else {
					self.index();
				}
			})
		})
	}


self.create = function(newMessage){
		self.messages_errors = [];
    console.log(newMessage);
		UserFactory.session(function(user){
			newMessage.user = user._id;
			MessageFactory.create(newMessage, function(res){
				if(res.data.errors){
					for(key in res.data.errors){
						var error = res.data.errors[key];
						self.messages_errors.push(error.message)
					}
				} else {
          self.newMessage = {};
					self.index();
				}
			})
		})
	}



})
