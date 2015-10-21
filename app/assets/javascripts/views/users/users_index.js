Kanban.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],

  initialize: function () {
    var that = this;
  },

  render: function () {
    var that = this;

    var renderedContent = that.template({
      users: that.collection
    });

    that.$el.html(renderedContent);

    return that;
  }
});
