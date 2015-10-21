Kanban.Models.CardComment = Backbone.RelationalModel.extend({
  urlRoot: '/api/card_comments',

  relations: [{
    type: Backbone.HasOne,
    key: 'user',
    relatedModel: 'Kanban.Models.User',
    collectionType: 'Kanban.Collections.Users',
    reverseRelation: {
      key: 'card'
    }
  }],

});
