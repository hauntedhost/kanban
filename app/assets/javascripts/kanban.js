window.Kanban = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var that = this;

    that.$rootEl = $('#content');

    Kanban.currentUser = new Kanban.Models.CurrentUser();
    Kanban.currentUser.fetch({
      success: function (response) {
        // console.log('got user');
        Kanban.boards = new Kanban.Collections.Boards();
        Kanban.boards.fetch({
          success: function (response) {
            // console.log('got boards');
            new Kanban.Routers.Main({
              $rootEl: that.$rootEl
            });
            Backbone.history.start();
          }
        });
      },

      error: function (response) {
        // console.log('please log in');
      }
    });
  }
};

$(document).ready(function(){
  Kanban.initialize();
});
