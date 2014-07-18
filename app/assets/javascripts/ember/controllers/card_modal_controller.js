Kanban.CardModalController = Ember.ObjectController.extend({
  actions: {
    submitComment: function() {
      var card = this.get('model');
      var comment = this.get('cardComment');
      console.log('got your comment', comment);
    }
  }
});
