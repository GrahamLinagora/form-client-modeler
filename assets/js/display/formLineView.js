define([
	"jquery",
  'underscore',
	"backbone",
	"helper/pubsub",
	"rest/formModelHelper",
	'text!display/lineTemplate.html',
	'display/displayHelper',
	"rest/restHelper"
], function(
  $, _, Backbone, PubSub, formModelHelper, LineTemplate, DisplayHelper, restHelper
){
	return Backbone.View.extend({
		tagName: "tr",
	
		render: function() {
			this.$el.html(_.template(LineTemplate, {form : this.model}));
			return this;
		},
    
		events: {
    	"click .editForm": "editForm",
			"click .deleteForm": "deleteForm",
  	},

		editForm: function() {
			formModelHelper.setCurrentFormModel(this.model);
			PubSub.trigger('loadForm');
			DisplayHelper.switchDisplayedDiv();
		},

		deleteForm: function() {
			var confirmation = window.confirm('Voulez vous vraiment supprimer ce formulaire ? ('+this.model.getName()+')');
				if(confirmation) {
				//TODO add loading on list during ajax call
				var that = this;
				restHelper.requestFormDeletion(this.model.getId(), function(data) {
					PubSub.trigger('deleteForm', that.model);
					that.$el.remove();
				});
			}
		},

	});

});
