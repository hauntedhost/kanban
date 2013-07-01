Kanban.Models.Board = Backbone.Model.extend({
  initialize: function () {
    var that = this;
    var lists = that.get("lists");
    that.set({ lists: new Kanban.Collections.Lists(lists) });
  },

  lists: function () {
    var that = this;
    return that.get("lists");
  },

  // updateLists: function () {
  //   var that = this;
  //   var freshLists = 
  //   that.set({ lists: })
  //   return that.id;
  // }

});
