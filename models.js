var MovieModel = Backbone.Model.extend({
  idAttribute: "_id",
  defaults: {
		title: 'Default',
		release: 2016,
		plot: 'ABC',
    rating: 0,
    cover: 'http://fillmurray.com/400/300'
	},
  initialize: function (stuff) {
    console.log("new movie model created: ");
    console.log(stuff);
  }
});
