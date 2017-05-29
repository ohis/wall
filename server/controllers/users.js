var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

  index: function(req,res){
    User.find({},function(err,users){
      if(err){
        return res.json(err);
      }
      return res.json(users);
    })
  },
  create: function(req,res){
    User.create(req.body,function(err,user){
      if(err){
        return res.json(err);
      }
      return res.json(user)
    })
  },
    show: function(req,res){
      User.findById(req.params.id,function(err,user){
        if(err){
          return res.json(err);
        }
        if(!user){
          return res.json({
            "error":"404 - user not found"
          })
        }return res.json(user);
      })
    },
    login: function(req,res){
    User.findOne({email: req.body.email}, function(err,user){
      if(err){
        return res.json(err);
      }
      if(user && user.authenticate(req.body.password)){
        return res.json(user);
      }
      return res.json({
        "errors":{
          "password":{
            "message": "Invalid credentials"
          }
        }
      })
    })
  },
  destroy: function(req,res){
    User.findById(req.params.id, function(err,user){
      if(err){
        return res.json(err);
      }
      user.remove(function(err,user){
        if(err){
          return res.json(err);
        }
        return res.json(user);
      })
    })
  }

}
