var FormView = Backbone.View.extend({
  tagname: 'div',
  collection: null,
  model: null,
  template: _.template(templates.addMovie),
  events: {
    'click .add-btn': 'addMovie',
  },
  addMovie: function (event) {
    event.preventDefault();
    console.log("addMovie");
    this.model.set({
      title: this.$el.find('.new-title').val(),
      release: this.$el.find('.new-release').val(),
      cover: this.$el.find('.new-cover').val(),
      plot: this.$el.find('textarea').val(),
      rating: this.$el.find('select').val(),
    });
    this.$el.find('input').val('');
    this.$el.find('textarea').val('');
    this.$el.find('select').val('1');
    this.collection.create(this.model);
    this.model = new MovieModel({});
    // console.log(this.collection);
  },
  initialize: function () {
    if(!this.model) {
      this.model = new MovieModel({});
    }
  },
  render: function () {
    var markup = this.template(this.model.toJSON());
    this.$el.html(markup);
    return this;
  }
});

var MovieView = Backbone.View.extend({
  tagName: 'article',
  template: _.template(templates.movie),
  events: {
    'click .delete-btn': 'removeMovie',
    'click .edit-btn': 'toggleEdit',
    'click .cancel-btn': 'toggleEdit',
    'click .submit-btn': 'editMovie'
  },

  editMovie: function (event) {
    event.preventDefault();
    this.toggleEdit();
    this.model.set({
      title: this.$el.find('.edit-title').val(),
      release: this.$el.find('.edit-release').val(),
      cover: this.$el.find('.edit-cover').val(),
      plot: this.$el.find('textarea').val(),
      rating: this.$el.find('select').val(),
    });
    this.model.save();

  },

  toggleEdit: function () {
    event.preventDefault();
    this.$el.find('.detail-box').toggleClass('hidden');
    this.$el.find('.edit-detail-box').toggleClass('hidden');
  },

  removeMovie: function () {
    this.model.destroy();
  },

  initialize: function () {
    console.log("new model" + this.model);
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var markup = this.template(this.model.toJSON());
    this.$el.html(markup);
    return this;
  }
});

var ListView = Backbone.View.extend({
  collection: null,
  el: '.content',
  initialize: function () {
    this.addAll();
    this.listenTo(this.collection, 'update', this.addAll);
  },
  addOne: function (el) {
    var modelView = new MovieView({model: el});
    this.$el.append(modelView.render().el);
  },
  addAll: function () {
      $('.content').html('');
      _.each(this.collection.models, this.addOne, this);
  }
});
