Kanban.Models.Board = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: "lists",
    relatedModel: "Kanban.Models.List",
    collectionType: "Kanban.Collections.Lists",
    reverseRelation: {
      key: "board"
    }
  },{
    type: Backbone.HasMany,
    key: "users",
    relatedModel: "Kanban.Models.User",
    collectionType: "Kanban.Collections.Users"
  }]
});
