var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Comment = mongoose.model('Comment');
var Message = mongoose.model('Message');

var UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required:[true,"Name cannot be blank"]
  },

  email:{type:String,
  required:[true,"Email cannot be blank"]},

  password:{
      type:String,
      required:[true,"Password cannot be blank"]
  },
  messages: [{type: mongoose.Schema.Types.ObjectId,
             ref:'Message'}],
  comments: [{type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'}]
          },
{timestamps:true})

UserSchema.methods.hashPassword = function(password){
	this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
UserSchema.methods.authenticate = function(password){
	return bcrypt.compareSync(password, this.password);
}

UserSchema.pre('save', function(callback){
	this.hashPassword(this.password);
	callback();
});

UserSchema.pre('remove', function(callback){
	var self = this;
	Message.remove({ user: self._id }, function(){

	}).then(function(){
		Comment.remove({ user: self._id}, callback)
	})
})

mongoose.model('User', UserSchema);
