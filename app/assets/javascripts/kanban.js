window.Kanban = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var that = this;

    that.$rootEl = $("#content");
    that.$rootEl.html("loading ...");

    Kanban.boards = new Kanban.Collections.Boards();
    Kanban.boards.fetch({
      success: function (boards) {
        new Kanban.Routers.Boards({ $rootEl: that.$rootEl });
        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  Kanban.initialize();
});
