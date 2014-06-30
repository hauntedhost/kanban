Kanban.ListsController = Ember.ArrayController.extend({
  actions: {
    addList: function() {
      var lists = this.get('model'),
          board = lists.owner,
          listTitle = this.get('listTitle'),
          listAttrs = { title: listTitle, board: board },
          list = this.store.createRecord('list', listAttrs);

      // clear input
      this.set('listTitle', '');

      // persist
      list.save().then(function() {
        // yay
      }, function() {
        // oops
        list.deleteRecord();
      });
    },
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
});
