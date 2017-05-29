var Users = require('../controllers/users.js');
var Messages = require('../controllers/messages.js');
var Comments = require('../controllers/comments.js');

module.exports = function(app){
  app.get('/users',Users.index);
  app.post('/users',Users.create);
  app.get('/users/:id',Users.show);
  app.post('/sessions',Users.login);
  //app.delete('/remove/:id',Users.destroy);

  app.get('/messages',Messages.index);
  app.post('/messages', Messages.create);
  app.get('/messages/:id',Messages.show);

  app.get('/comments', Comments.index);
  app.post('/comments',Comments.create);
  app.get('/comments/:id',Comments.show);

  app.delete('/users/:id', Users.destroy);
	app.delete('/messages/:id', Messages.destroy);
	app.delete('/comments/:id', Comments.destroy);

  app.put('/messages/:id/likes', Messages.updateLikes);
	app.put('/comments/:id/likes', Comments.updateLikes);
}
