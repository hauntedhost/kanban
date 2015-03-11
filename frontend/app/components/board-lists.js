import Ember from 'ember';

export default Ember.Component.extend({
  board: null,

  lists: Ember.computed.alias('board.lists'),
  position: ['position'],
  sortedLists: Ember.computed.sort('lists', 'position'),

  updateListPosition: function(id, index) {
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

  // sortableParams: function($sortable) {
  //   return $sortable.sortable('serialize', {
  //     attribute: 'data-position'
  //   });
  // },

  sortableUpdate: function(event) {
    var $el = Ember.$(event.target);
    var listIds = this.sortableIds($el, 'list_');

    var updateListPosition = _.bind(this.updateListPosition, this);
    listIds.map(updateListPosition);
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
