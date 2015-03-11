import Ember from 'ember';

export default Ember.Component.extend({
  list: null,
  cards: Ember.computed.alias('list.cards'),

  // cards: function() {
  //   console.log('card moved');
  //   return this.list.get('cards');
  // // }.property('list.cards.@each.position'),
  // }.property('list.cards'),

  // position: ['position'],
  // sortedCards: Ember.computed.sort('cards', 'position'),

  // note: errors when using Em.computed.sort
  sortedCards: function() {
    return this.get('cards').sortBy('position');

    // note: filter out moving:
    // var cards = this.get('cards').filter(function(card) {
    //   return !card.get('moving');
    // }).sortBy('position');
    // return cards;
  }.property('cards.@each.position'),

  updateCardPosition: function(id, index) {
    var newPosition = index + 1;
    var newList = this.list;
    this.store.find('card', id).then(function(card) {
      var newProperties = {};

      if (card.get('position') !== newPosition) {
        newProperties.position = newPosition;
      }

      if (card.get('list.id') !== newList.id) {
        newProperties.list = newList;
      }

      // card.store.push('card', newProperties)
      card.setProperties(newProperties);
      card.save();

      // console.log('repositioning card', card.get('title'));
      // card.set('position', newPosition);
      // card.save();

      // if (card.get('position') == newPosition &&
      //     card.get('list.id') == newList.id) { return; }

      // if (card.get('position') != newPosition) {
      //   // console.log('position', newPosition);
      //   card.set('position', newPosition);
      // }

      // if (card.get('list.id') != newList.id) {
      //   console.log('to list', newList.get('title'));
      //   card.set('list', newList);
      //   card.set('moving', false);
      // }

      // card.setProperties({
      //   position: newPosition,
      //   list: newList
      // });

      // card.save();
    });
  },

  sortableIds: function($sortable, prefix) {
    return $sortable.sortable('toArray', {
      attribute: 'data-position'
    }).map(function(param) {
      return parseInt(param.split(prefix)[1]);
    });
  },

  sortCards: function(cardParams, list) {
    // var list = this.list;
    var store = this.store;
    var sortCardsURL = '/api/cards/sort';

    Ember.$.post(sortCardsURL, cardParams, function(response) {
      // store.pushPayload('card', response);
      response.cards.forEach(function(card) {
        // store.pushPayload('card', card);
        // store.find('card', cardData.id).then(function(card) {
        //   // card.set('moving', false);
        //   card.store.push('card', {
        //     id: cardData.id,
        //     list: list,
        //     position: cardData.position
        //   });
        // });

        store.push('card', {
          id: card.id,
          list: list,
          position: card.position
        });
        // card.set('moving', false);
      });

      // response.list
      // debugger;
      // store.push('list', response.list);
    });
  },

  sortRemove: function(event, ui) {
    // var store = this.store;
    // var $el = Ember.$(event.target);
    // var cardIds = this.sortableIds($el, 'card_');

    // var $card = Ember.$(event.toElement);
    // var $list = $card.closest('.list');
    // var cardId = $card.data('card-id');
    // var listId = $list.data('list-id');
    // var cardIds = this.sortableIds($el, 'card_');

    // debugger;

    // Ember.RSVP.hash({
    //   card: store.find('card', cardId),
    //   list: store.find('list', listId)
    // }).then(function(data) {
    //   var card = data.card;
    //   var list = data.list;

    //   if (card.get('list.id') == list.id) { return; }
    //   console.log('moving card', card.get('title'),
    //               'to list', list.get('title'));
    //   card.set('list', list);
    //   card.save();
    // });

    // debugger;
    // this.store.find('card', cardId).then(function(card) {
    //   card.set('list')
    // });
  },

  sortReceive: function(event, ui) {
    // var store = this.store;
    // var $el = Ember.$(event.target);
    // var cardIds = this.sortableIds($el, 'card_');

    // var $card = Ember.$(event.toElement);
    // var $list = $card.closest('.list');
    // var cardId = $card.data('card-id');
    // var listId = $list.data('list-id');
    // var cardIds = this.sortableIds($el, 'card_');

    // var updateCardPosition = _.bind(this.updateCardPosition, this);

    // Ember.RSVP.hash({
    //   card: store.find('card', cardId),
    //   list: store.find('list', listId)
    // }).then(function(data) {
    //   var card = data.card;
    //   var list = data.list;

    //   // if (card.get('list.id') == list.id) { return; }
    //   console.log(
    //     'moving card', card.get('title'),
    //     'to list', list.get('title')
    //   );

    //   debugger;

    //   card.set('list', list);
    //   card.save();

    //   cardIds.map(updateCardPosition);
    //   // debugger;
    //   // Ember.run.scheduleOnce('afterRender', this, function() {
    //   //   cardIds.map(updateCardPosition);
    //   // });
    // });
  },

  sortUpdate: function(event, ui) {
    var component = this;
    var store = this.store;

    var $card = $(ui.item);
    var $cards = $card.closest('.cards');
    var cardId = $card.data('card-id');

    var $list = $card.closest('.list');
    var listId = $list.data('list-id');

    // var cardIds = this.sortableIds($cards, 'card_');
    // var updateCardPosition = _.bind(this.updateCardPosition, this);
    // cardIds.map(updateCardPosition);

    // mark card moving as moving
    var cardParams = $cards.sortable('serialize', {
      attribute: 'data-position'
    });
    cardParams += '&list_id=' + listId;

    // $cards.sortable('cancel');
    // debugger;

    Ember.RSVP.hash({
      card: store.find('card', cardId),
      list: store.find('list', listId)
    }).then(function(data) {
      var card = data.card;
      var list = data.list;
      component.sortCards(cardParams, list);
    });

    // this.store.find('card', cardId).then(function(card) {
    //   if (card.get('list.id') !== listId) {
    //     // card.set('moving', true);
    //   }
    //   component.sortCards(cardParams);
    // });

    // ---------------------------------------------

    // var $el = Ember.$(event.target);

    // zoooooom
    // var $card = Ember.$(event.toElement);
    // var $list = $card.closest('.list');
    // // var $cards = Ember.$(event.toElement.parentElement);
    // var cardId = $card.data('card-id');
    // var listId = $list.data('list-id');

    // this.store.find('card', cardId).then(function(card) {
    //   if (card.get('list.id') != listId) {
    //     console.log('setting card', card.get('title'), 'moving');
    //     card.set('moving', true);
    //   }
    // });

    // var card = this.store.find('card', cardId);
    // var list = this.store.find('list', listId);
    // this.store.find('list', targetListId).then(function(list) {
    //   console.log('card moved to list', list.get('title'));
    // })

    // var cardIds = this.sortableIds($cards, 'card_');
    // var listID = $el.data('list-id');
    // $el.sortable('cancel');
    // debugger;

    // debugger;

    // var updateCardPosition = _.bind(this.updateCardPosition, this);

    // Ember.run.scheduleOnce('afterRender', this, function() {
    //   cardIds.map(updateCardPosition);
    // });

    // if (!_.isEmpty(cardIds)) {
    //   var updateCardPosition = _.bind(this.updateCardPosition, this);

    //   Ember.run.scheduleOnce('afterRender', this, function() {
    //     cardIds.map(updateCardPosition);
    //   });

    //   // cardIds.map(updateCardPosition);
    // }

    // var cardParams = $el.sortable('serialize', {
    //   attribute: 'data-position'
    // });

    // if (cardParams) {
    //   // add list_id to sortData so that it looks like this:
    //   // card[]=2&card[]=3&card[]=1&list_id=8
    //   // var listID = $el.data('list-id');
    //   // var listId = this.list.id;
    //   cardParams += '&list_id=' + this.list.id;
    //   this.sortCards(cardParams);
    // }
  },

  attachSortable: function() {
    // sortable for cards
    var $cards = this.$('.cards');
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
      // receive: function(event) {
      //   debugger;
      // },
      // sort: function(event) {
      //   debugger;
      // },
      // update: sortableUpdate
    });

    var sortRemove = _.bind(this.sortRemove, this);
    var sortReceive = _.bind(this.sortReceive, this);
    var sortUpdate = _.bind(this.sortUpdate, this);

    $cards.on('sortremove', sortRemove);
    $cards.on('sortreceive', sortReceive);
    $cards.on('sortupdate', sortUpdate);
  }.on('didInsertElement')
});
