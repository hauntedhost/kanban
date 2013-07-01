Kanban.Models.Board = Backbone.Model.extend({
  initialize: function () {
    var lists = this.get("lists");
    this.set({ lists: new Kanban.Collections.Lists(lists) });
  },

  lists: function () {
    return this.get("lists");
  }
  
});
