Kanban.Models.Board = Backbone.RelationalModel.extend({

  urlRoot: '/api/boards',

  relations: [{
    type: Backbone.HasMany,
    key: 'lists',
    relatedModel: 'Kanban.Models.List',
    collectionType: 'Kanban.Collections.Lists',
    reverseRelation: {
      key: 'board'
    }
  },{
    type: Backbone.HasMany,
    key: 'users',
    relatedModel: 'Kanban.Models.User',
    collectionType: 'Kanban.Collections.Users'
  }]

  // getList: function (id) {
  //  var that = this;

  //  // OPTIMIZE: refactor
    // var lists = that.get('lists');
    // var list = lists.get(id);
    // return list;
  // },

  // getCard: function (id) {
  //  var that = this;
  //  var foundCard;
  //  var lists = that.get('lists');
    // lists.each(function (list) {
    //  var cards = list.cards();
    //  var card = cards.get(id);
    //  if (card) {
    //    // console.log('found card #' + id);
    //    foundCard = card;
    //  };
    // });
    // return foundCard;
  // }
});
