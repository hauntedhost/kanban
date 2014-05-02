Kanban.BoardController = Ember.ObjectController.extend({
  resortLists: function(listParams) {
    var store = this.store,
        sortListsURL = '/api/lists/sort';

    listParams += "&ember=true";
    $.post(sortListsURL, listParams, function(response) {
      response.lists.forEach(function(listData) {
        store.update('list', { id: listData.id,
                               position: listData.position});
      });
    });
  },

  resortCards: function(cardParams) {
    var store = this.store,
        sortCardsURL = '/api/cards/sort';

    cardParams += "&ember=true";
    $.post(sortCardsURL, cardParams, function(response) {
      response.cards.forEach(function(cardData) {
        store.update('card', { id: cardData.id,
                               position: cardData.position});
      });
    });
  }
});
