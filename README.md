KANBAN 看板
===========

Demo
----
Live demo hosted here on Heroku (database is reset daily):
[**LIVE DEMO**](http://kanban.seanomlor.com)

[![Screenshot](/app/assets/images/screenshot.jpg)](http://kanban.seanomlor.com)

Summary
-------
Kanban is a work-in-progress Trello clone.

Built with Ruby on Rails on the backend as a JSON API for Backbone.js on the frontend.

Notes
-----
* Hand-rolled Rails user authentication with BCrypt
* Custom, nested Rails JSON templating with [Rabl](https://github.com/nesquena/rabl)
* Backbone models/collections with [Backbone-relational.js](http://backbonerelational.org/)
* Auto-updating comment timestamps with jQuery [timeago](http://timeago.yarp.com)
* Editable board, list and card titles with jQuery [JEditable](http://www.appelsiini.net/projects/jeditable)

License
-------
Kanban is released under the [MIT License](/LICENSE).

---
Developed by [Sean Omlor](http://seanomlor.com)
