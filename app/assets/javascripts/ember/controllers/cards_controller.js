Kanban.CardsController = Ember.ArrayController.extend({
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
