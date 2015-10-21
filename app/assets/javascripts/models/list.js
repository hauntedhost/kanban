Kanban.Models.List = Backbone.RelationalModel.extend({
  urlRoot: '/api/lists',

  relations: [{
    type: Backbone.HasMany,
    key: 'cards',
    relatedModel: 'Kanban.Models.Card',
    collectionType: 'Kanban.Collections.Cards',
    reverseRelation: {
      key: 'list'
    }
  }],

  // cards: function () {
  //   return this.get('cards');
  // }
});
