import Ember from 'ember';

export default Ember.Component.extend({
  list: null,
  cards: Ember.computed.alias('list.cards'),

  // NOTE: errors when using Em.computed.sort
  sortedCards: function() {
    return this.get('cards').sortBy('position');
  }.property('cards.@each.position'),

  sortCards: function(cardParams, list) {
    var component = this;
    var store = this.store;
    var sortCardsURL = '/api/cards/sort';

    Ember.$.post(sortCardsURL, cardParams, function(response) {
      response.cards.forEach(function(cardData) {
        store.find('card', cardData.id).then(function(card) {
          var noChange = card.get('list.id') === list.get('id') &&
                         card.get('position') === cardData.position;

          if (!noChange) {
            store.push('card', {
              id: card.id,
              list: list,
              position: cardData.position
            });
          }
        })
      });
    });
  },

  sortUpdate: function(event, ui) {
    var component = this;
    var store = this.store;

    var $card = $(ui.item);
    var $cards = $card.closest('.cards');
    var $list = $card.closest('.list');
    var listId = $list.data('list-id');

    var cardParams = $cards.sortable('serialize', {
      attribute: 'data-position'
    });

    // $cards.sortable('cancel');

    // add listId to cardParams
    cardParams += '&list_id=' + listId;

    store.find('list', listId).then(function(list) {
      component.sortCards(cardParams, list);
    });
  },

  attachSortable: function() {
    var $cards = this.$('.cards');
    var sortUpdate = _.bind(this.sortUpdate, this);

    $cards.sortable({
      items: '.card',
      connectWith: '.cards',
      delay: 125,
      tolerance: 'pointer',
      placeholder: 'card-placeholder',
      start: function (event, ui) {
        ui.placeholder.width(ui.item.width());
        ui.placeholder.height(ui.item.height());
      },
      update: sortUpdate
    });
  }.on('didInsertElement')
});
