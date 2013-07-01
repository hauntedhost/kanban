Kanban.Collections.Boards = Backbone.Collection.extend({
  model: Kanban.Models.Board,
  url: "/api/boards"
});
