// For more information see: http://emberjs.com/guides/routing/

Kanban.Router.map(function() {
  this.resource('boards', { path: '/' });
  this.resource('board', { path: '/boards/:board_id' });
});
