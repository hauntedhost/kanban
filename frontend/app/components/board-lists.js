import Ember from 'ember';

export default Ember.Component.extend({
  board: null,

  lists: Ember.computed.alias('board.lists'),
  // lists: function() {
  //   console.log('list moved');
  //   return this.board.get('lists');
  // }.property('board.lists'),
  // }.property('board.lists.@each.position'),

  position: ['position'],
  sortedLists: Ember.computed.sort('lists', 'position'),

  updateListPosition: function(id, index) {
    // this.store.push('list', {
    //   id: id,
    //   position: index + 1
    // });

    var newPosition = index + 1;
    this.store.find('list', id).then(function(list) {
      if (list.get('position') == newPosition) return;
      list.set('position', newPosition);
      list.save();
    });
  },

  sortableIds: function($sortable, prefix) {
    return $sortable.sortable('toArray', {
      attribute: 'data-position'
    }).map(function(param) {
      return parseInt(param.split(prefix)[1]);
    });
  },

  // sortLists: function(listParams) {
  //   var store = this.store;
  //   var sortListsURL = '/api/lists/sort';

  //   Ember.$.post(sortListsURL, listParams, function(response) {
  //     // store.pushPayload('list', response);
  //   });
  // },

  sortableParams: function($sortable) {
    return $sortable.sortable('serialize', {
      attribute: 'data-position'
    });
  },

  sortableUpdate: function(event) {
    var $el = Ember.$(event.target);
    var listIds = this.sortableIds($el, 'list_');
    // $el.sortable('cancel');

    var updateListPosition = _.bind(this.updateListPosition, this);
    listIds.map(updateListPosition);

    // persist success
    // var listParams = this.sortableParams($el);
    // var listParams = $el.sortable('serialize', {
    //   attribute: 'data-position'
    // });
    // this.sortLists(listParams);
  },

  attachSortable: function() {
    var sortableUpdate = _.bind(this.sortableUpdate, this);
    this.$('.lists').sortable({
      items: '.list',
      tolerance: 'pointer',
      placeholder: 'list-placeholder',
      start: function(e, ui) {
        ui.placeholder.width(ui.item.width());
        ui.placeholder.height(ui.item.height());
      },
      update: sortableUpdate
    });
  }.on('didInsertElement')
});
