var mongoose = require('mongoose');
var User = mongoose.model('User');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

module.exports = {
  index: function(req,res){
    Comment.find({}).populate('user').exec(function(err,comments){
      if(err){
        return res.json(err);
      }return res.json(comments);
    })
  },
  create: function(req, res){
		Comment.create(req.body, function(err, comment){
      console.log(req.body);
			if(err){
        console.log(err);
				return res.json(err);
			}//console.log(comment);
			Message.findByIdAndUpdate(req.body.message, { $push: { comments: comment._id }}, function(err, message){
				if(err){
					return res.json(err);
				}
        console.log("get user");
      console.log(req.body.user.name);
				User.findByIdAndUpdate(req.body.user, { $push : { comments: comment._id }}, function(err, user){
					if(err){
						console.log(err);
						return res.json(err);
					}
					console.log(comment);
					return res.json(comment);
				})
			})
			console.log("returning comment");
			console.log(comment);
			//return res.json(comment);
		})
	},


show: function(req,res){
  Comment.findById(req.params.id,function(err,comment){
    if(err){
      return res.json(err);
    }return res.json(comment);
  })
},

destroy: function(req, res){
		Comment.findById(req.params.id, function(err, comment){
			if(err){
				return res.json(err);
			}
			comment.remove(function(err, comment){
				if(err){
					return res.json(err);
				}
				return res.json(comment);
			})
		})
	},

  updateLikes: function(req, res){
		console.log(req.body)
		Comment.findByIdAndUpdate(req.params.id, { $inc : { "likes.count" : 1 }, $push: { "likes.users": req.body.user }}, { new: true }, function(err, comment){
			if(err){
				return res.json(err);
			}
			return res.json(comment);
		})
	}
}
