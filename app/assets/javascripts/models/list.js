Kanban.Models.List = Backbone.Model.extend({
  parse: function (data) {
    data.cards = new Kanban.Collections.Cards(data.cards);
    return data;
  }
});
