Kanban.ListsView = Ember.View.extend({
  templateName: 'lists',
  classNames: ['lists_wrapper'],

  didInsertElement: function() {
    // sortable for lists
    var controller = this.get('controller');
    this.$('section.lists').sortable({
      items: 'div.list',
      tolerance: 'pointer',
      placeholder: 'list-placeholder',
      start: function(e, ui) {
        ui.placeholder.width(ui.item.width());
        ui.placeholder.height(ui.item.height());
      },
      update: function(data) {
        // list sort data looks like this:
        // list[]=8&list[]=9&list[]=7
        var listParams = $(this).sortable('serialize', { attribute: 'data-position' });
        console.log('listParams:', listParams);
        controller.resortLists(listParams);
      }
    });
  }
});
