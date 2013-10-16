//TODO specific display while loading

define([
  'jquery',
  'underscore',
  'backbone',
  'display/formCollection',
	'display/formLineView',
	"helper/pubsub",
	'display/displayHelper',
	'rest/formModelHelper',
], function($, _, Backbone, FormCollection, FormLineView, PubSub, DisplayHelper, formModelHelper){
	return Backbone.View.extend({
		//tagName: "div",
    
		initialize: function () {
      this.isLoading = false;
      this.formCollection = new FormCollection();

			PubSub.on("deleteForm", this.handleDeleteFormEvent, this);

			this.render();
    },

    render: function () {
			//TODO fetch should call render and render should not call fetch
      this.fetchForms();
    },

    fetchForms: function () {
      var that = this;
      this.isLoading = true;
      // fetch is Backbone.js native function for calling and parsing the collection url
      this.formCollection.fetch({ 
        success: function (forms) {
					forms.each(function (form) {
						$("#formTableBody").append(new FormLineView({model: form}).render().el);
					});
					that.isLoading = false;
        }
      });      
    },

    events: {
			//Listen for scroll events and adds a listener for infinite list
      'scroll': 'handleScroll',
			//Listen for clicks on the new form button
			'click .newForm': 'handleNewFormEvent',
    },
    
		handleScroll: function () {
      var triggerPoint = 100; // 100px from the bottom
      if( !this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight ) {
        this.fetchForms();
      }
    },

		handleNewFormEvent: function () {
			formModelHelper.resetFormModel();
			PubSub.trigger('loadForm');
			DisplayHelper.switchDisplayedDiv();
		},

		handleDeleteFormEvent: function (formModel) {
			this.formCollection.remove(formModel);
		},

  });

});
