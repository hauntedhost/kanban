Kanban.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  tagName: 'section',
  className: 'board-show group',

  initialize: function () {
    var that = this;
    that.model.on('all', that.render, that);
  },

  events: {
    'submit form.add_list': 'addList',
    'click button.archive_list': 'archiveList',
  },

  addList: function (event) {
    event.preventDefault();
    var that = this;

    var board = that.model;
    // get form attrs, reset form
    var $form = $(event.target);
    var attrs = $form.serializeJSON();
    $form[0].reset();

    // add board_id to attrs, create new list
    attrs.list.board_id = board.id;
    var list = new Kanban.Models.List();
    var lists = board.get('lists');

    // fail if no list title
    if (!attrs.list.title) {
      var $scrollPos = $('div.lists_wrapper').scrollLeft();
      var $addList = $('div.add_list');
      var $addListInput = $('div.add_list input.list_title');

      $addListInput.hide();
      $addList.effect('shake', {
        distance: 9,
        times: 2,
        complete: function () {
          $addListInput.show();
          $addListInput.focus();
        }
      }, 350);
      $('div.lists_wrapper').scrollLeft($scrollPos);
      return false;
    }

    // save list
    list.save(attrs.list, {
      success: function (data) {
        lists.add(list);

        // animate list insertion
        setTimeout(function () {
          $('#list_' + list.id).removeClass('animated flipInY');
        }, 650);
        $('#list_' + list.id).addClass('animated flipInY');

        // keep focus on list input
        $('div.add_list input.list_title').focus();
      }
    });
  },

  archiveList: function (event) {
    event.stopPropagation();
    var that = this;

    var board = that.model;
    var listId = parseInt($(event.target).data('list-id'));
    var lists = board.get('lists');
    var list = lists.get(listId);

    // save horizontal scroll position
    var $scrollPos = $('div.lists_wrapper').scrollLeft();

    // cards hinge animation
    var cards = list.get('cards');
    var timeOffset = 115 * cards.length;
    cards.each(function (card) {
      setTimeout(function () {
        $('#card_' + card.id).addClass('animated hinge');
        console.log(card.get('title'));
      }, timeOffset);
      timeOffset -= 115;
    });

    // list hinge animation
    $('#list_' + listId).addClass('animated hinge');
    setTimeout(function () {
      // remove list
      list.destroy({
        success: function (data) {
          lists.remove({ id: listId });

          // restore horizontal scrollbar position
          $('div.lists_wrapper').scrollLeft($scrollPos);
        }
      });
    }, 1400);

  },

  render: function () {
    var that = this;

    // console.log('render board');
    var board = that.model;
    var lists = board.get('lists');
    var users = board.get('users');

    that.$el.html(that.template({
      board: board
    }));

    // render lists
    lists.each(function (list) {
      var listShow = new Kanban.Views.ListShow({
        model: list
      });
      that.$('section.lists').append(listShow.render().el);
    });

    // include members in sidebar
    var usersIndex = new Kanban.Views.UsersIndex({
      collection: users
    });
    that.$('section.board-sidebar').html(usersIndex.render().el);

    // inline edit for board title
    that.$('.js-edit-board-name').editable(function (value, settings) {
      board.set({ name: value });
      board.save();
      return value;
    }, {
      submit: 'Save',
      onblur: 'submit',
      cssclass : 'animated fadeIn'
    });

    // sortable for lists
    sortListsUrl = '/api/lists/sort'
    var $lists = that.$('section.lists');
    $lists.sortable({
      items: 'div.list',
      tolerance: 'pointer',
      placeholder: 'list-placeholder',
      start: function (e, ui) {
        ui.placeholder.width(ui.item.width());
        ui.placeholder.height(ui.item.height());
        // ui.item.addClass('animated swing');
      },
      update: function (data) {
        var sortData = $(this).sortable('serialize');
        $.post(sortListsUrl, sortData, function (resortedLists) {
          board.get('lists').reset(resortedLists);
        });
      }
    });

    // draggable board members
    var $users = that.$('ul.users li');
    $users.draggable({
      helper: 'clone',

      start: function (event, ui) {
        // console.log(ui);
        var user_id = $(event.target).data('user-id');
        console.log('picked up user ' + user_id);
      }
    });

    return that;
  }
});
