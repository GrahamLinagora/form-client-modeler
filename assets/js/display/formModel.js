define([
      'jquery', 'underscore', 'backbone'
], function($, _, Backbone) {
  return Backbone.Model.extend({

		//ID
    getId : function(){
			return this.get('_id');
    },

		//NAME
    getName : function(){
			return this.get('name');
    },
		setName: function(name) {
			this.set('name', name);
		},

		//CREATION DATE
		getCreationDate : function() {
			return this.get('created_at');
		},

		//FIELDS
		getFields: function() {
			return this.get('model');
		},
		setFields: function(fields) {
			this.set('model', fields);
		},

		//DESCRIPTION
		setDescription: function(description) {
			this.set('description', description);
		},
		getDescription: function() {
			return this.get('description');
		},


  });
});
