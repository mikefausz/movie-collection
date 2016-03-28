var MovieCollection = Backbone.Collection.extend({
 model: MovieModel,
 url: 'http://tiny-tiny.herokuapp.com/collections/mikesmovies',
 initialize: function (options) {
   console.log("New movie collection: ");
    console.log(options);
 }
});
