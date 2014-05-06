// http://emberjs.com/guides/models/using-the-store/

Kanban.Store = DS.Store.extend({
  // Override the default adapter with the `DS.ActiveModelAdapter` which
  // is built to work nicely with the ActiveModel::Serializers gem.
  adapter: '_ams'
});

Kanban.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api',
  headers: { ember: true }
});

Kanban.ApplicationSerializer = DS.RESTSerializer.extend({
  // add _id(s) to association keys
  keyForRelationship: function(rel, kind) {
    if (kind === 'belongsTo') {
      var underscored = rel.underscore();
      return underscored + "_id";
    } else {
      var singular = rel.singularize();
      var underscored = singular.underscore();
      return underscored + "_ids";
    }
  }
});
