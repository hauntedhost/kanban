// http://emberjs.com/guides/models/using-the-store/

Kanban.ApplicationStore = DS.Store.extend({
  adapter: '_ams'
});

DS.RESTAdapter.reopen({
  namespace: 'api',
  headers: { ember: true }
});

// Override the default adapter with the `DS.ActiveModelAdapter` which
// is built to work nicely with the ActiveModel::Serializers gem.
Kanban.ApplicationAdapter = DS.ActiveModelAdapter.extend({});

Kanban.Store = DS.Store.extend({
  // Override the default adapter with the `DS.ActiveModelAdapter` which
  // is built to work nicely with the ActiveModel::Serializers gem.
  adapter: '_ams'
});

$(function() {
  var token = $('meta[name="csrf-token"]').attr('content');
  $.ajaxPrefilter(function(options, originalOptions, xhr) {
    return xhr.setRequestHeader('X-CSRF-Token', token);
  });
});

// Kanban.ApplicationAdapter = DS.RESTAdapter.extend({
//   namespace: 'api',
//   headers: { ember: true }
// });

// Kanban.ApplicationSerializer = DS.RESTSerializer.extend({
//   // add _id(s) to association keys
//   keyForRelationship: function(rel, kind) {
//     if (kind === 'belongsTo') {
//       var underscored = rel.underscore();
//       return underscored + "_id";
//     } else {
//       var singular = rel.singularize();
//       var underscored = singular.underscore();
//       return underscored + "_ids";
//     }
//   }
// });
