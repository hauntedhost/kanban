Kanban.CardsController = Ember.ArrayController.extend({
  needs: ['list'],
  actions: {
    addCard: function() {
      var cards = this.get('model'),
          list = cards.owner,
          cardTitle = this.get('cardTitle'),
          cardAttrs = { title: cardTitle, list: list },
          card = this.store.createRecord('card', cardAttrs);

      // clear input
      this.set('cardTitle', '');

      // persist
      card.save().then(function() {
        // yay
      }, function() {
        // oops
        card.deleteRecord();
      });
    }
  },

  resortCards: function(cardParams, cardArray, listId) {
    var controller = this;
    var sortCardsURL = '/api/cards/sort';

    // this.cardArray = cardArray.map(function(card) {
    //   return card.replace('card_', '');
    // });

    // this.forEach(function(card, idx) {
    //   // var index = indexes[item.get('id')];
    //   // item.set('idx', index);
    //   debugger;
    // }, this);
    this.listId = listId;
    this.beginPropertyChanges();
    cardArray.forEach($.proxy(function(card, idx) {
      var store = this.store;
      var listId = this.listId;
      var cardId = card.replace('card_', '');

      store.update('card', { id: cardId,
                             list: listId,
                             position: idx + 1 });
    }, this));
    this.endPropertyChanges();

    var list = this.get('model.owner');
    list.save();

    // this.store.find('list', { id: listId }).then(function(list) {
    //   debugger;
    // });

    // var cards = this.get('model');
    // cards.save();

    // cardParams += "&ember=true";
    // $.ajax({
    //   url: sortCardsURL,
    //   type: 'post',
    //   data: cardParams,
    //   controller: controller,
    //   success: function(response) {
    //     var controller = this.controller;
    //     var store = controller.store;
    //     response.cards.forEach(function(cardData) {
    //       store.update('card', { id: cardData.id,
    //                              list: cardData.list_id,
    //                              position: cardData.position});
    //     });
    //   }
    // })

    // $.post(sortCardsURL, cardParams, function(response) {
    //   response.cards.forEach(function(cardData) {
    //     store.update('card', { id: cardData.id,
    //                            list: cardData.list_id,
    //                            position: cardData.position});
    //   });
    // });
  }
});
