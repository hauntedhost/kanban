Kanban.BoardController = Ember.ObjectController.extend({
  resortLists: function(listParams) {
    var store = this.store,
        sortListsURL = '/api/lists/sort';

    listParams += "&ember=true";
    $.post(sortListsURL, listParams, function(response) {
      response.lists.forEach(function(listData) {
        // store.push('list', listData);
        list = store.getById('list', listData.id);
        list.set('position', listData.position);
        // list.save(); // POSTS -- unnecessary
      });
    });
  },

  resortCards: function(cardParams) {
    var store = this.store,
        sortCardsURL = '/api/cards/sort';

    cardParams += "&ember=true";
    $.post(sortCardsURL, cardParams, function(response) {
      response.cards.forEach(function(cardData) {
        // store.push('card', cardData);
        card = store.getById('card', cardData.id);
        card.set('position', cardData.position);
      });
    });
  }
});
