Kanban.Models.Board = Backbone.Model.extend({
  initialize: function () {
    // console.log("initialize board");
    var lists = this.get("lists");
    this.set({ lists: new Kanban.Collections.Lists(lists) });
  },

  lists: function () {
    return this.get("lists");
  },

  // parse: function (data) {
  //   data.lists = new Kanban.Collections.Lists(data.lists);

  //   data.lists.each(function (list) {
  //     var cards = new Kanban.Collections.Cards(list.get("cards"));
  //     list.set({ cards: cards });
  //   });
    
  //   return data;
  // }
});
