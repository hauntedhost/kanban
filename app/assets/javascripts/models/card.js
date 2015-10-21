Kanban.Models.Card = Backbone.RelationalModel.extend({
  urlRoot: '/api/cards',

  relations: [{
    type: Backbone.HasMany,
    key: 'comments',
    relatedModel: 'Kanban.Models.CardComment',
    collectionType: 'Kanban.Collections.CardComments',
    reverseRelation: {
      key: 'card'
    }
  },{
    type: Backbone.HasOne,
    key: 'assignee',
    relatedModel: 'Kanban.Models.User',
    collectionType: 'Kanban.Collections.Users'
  }],
});
