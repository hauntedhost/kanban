Kanban.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],

  events: {

  },

  render: function () {
    var that = this;

    var renderedContent = that.template({
      board: that.model
    });

    that.$el.html(renderedContent);
    return that;
  }

});
