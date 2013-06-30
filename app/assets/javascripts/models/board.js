Kanban.Models.Board = Backbone.Model.extend({
  parse: function (data) {
    data.lists = new Kanban.Collections.Lists(data.lists);

    data.lists.each(function (list) {
      var cards = new Kanban.Collections.Cards(list.get("cards"));
      list.set({ cards: cards });
    });
    
    return data;
  }
});
