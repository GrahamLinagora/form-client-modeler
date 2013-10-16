define([
  'jquery',
  'underscore',
  'backbone',
	'display/formModel'
], function($, _, Backbone, FormModel){
  return Backbone.Collection.extend({
		model : FormModel,
    url: function () {
      return 'http://localhost:3000/forms'
    },
  });
});
