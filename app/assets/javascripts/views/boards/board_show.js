Kanban.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  tagName: "section",
  className: "boards_show",

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
