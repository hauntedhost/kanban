Kanban.BoardController = Ember.ObjectController.extend({
  actions: {
    addList: function() {
      var board = this.get('model'),
          lists = board.get('lists'),
          listTitle = this.get('listTitle'),
          listAttrs = { title: listTitle, board: board },
          list = this.store.createRecord('list', listAttrs);

      // clear input
      this.set('listTitle', '');

      // persist
      list.save().then(function() {
        // debugger;
      }, function() {
        list.deleteRecord();
      });
    },

    addCard: function() {
      console.log('add card');
    }
  },

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
