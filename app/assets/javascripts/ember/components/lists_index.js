// Kanban.ListsIndexComponent = Ember.Component.extend({
//   sortableLists: function() {
//     this.$('section.lists').sortable({
//       items: 'div.list',
//       tolerance: 'pointer',
//       placeholder: 'list-placeholder',
//       start: function(e, ui) {
//         ui.placeholder.width(ui.item.width());
//         ui.placeholder.height(ui.item.height());
//       },
//       update: function(data) {
//         // list sort data looks like this:
//         // list[]=8&list[]=9&list[]=7
//         var sortData = $(this).sortable('serialize', { attribute: 'data-position' });
//         console.log('sortData:', sortData);

//         // TODO: rewrite for ember
//         // -----------------------
//         // var sortListsUrl = '/api/lists/sort';
//         // $.post(sortListsUrl, sortData, function (resortedLists) {
//         //   // board.get("lists").reset(resortedLists);
//         // });
//       }
//     });
//   }.on('didInsertElement')
// });
