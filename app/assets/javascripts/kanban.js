window.Kanban = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Kanban.Routers.Boards({
      $rootEl: $("#content")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Kanban.initialize();
});
