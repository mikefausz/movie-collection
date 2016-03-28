$(document).ready(function() {
  var movieCollection = new MovieCollection();
  movieCollection.fetch().done(function(){
    new ListView({collection: movieCollection});
  });

  var addMovieForm = new FormView({collection: movieCollection});
  $('body').prepend(addMovieForm.render().el);
});
