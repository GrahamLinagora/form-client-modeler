define([
	"jquery",
	"backbone",
	"display/displayHelper",
	"helper/pubsub",
	"rest/formModelHelper",
	"rest/restHelper"
], function(
  $, Backbone, DisplayHelper, PubSub, formModelHelper, restHelper
){
  return Backbone.View.extend({
		tagName: "div",

		initialize: function() {
			//Listen to the the loadForm Event to fill the name and dsec input
			PubSub.on("loadForm", this.loadForm, this);
		},

		loadForm: function() {
			//fill name and desc inputs
			this.$("#nameInput").val(formModelHelper.getCurrentFormModel().getName());
			this.$("#descInput").val(formModelHelper.getCurrentFormModel().getDescription());
		},

		events: {
			//Button click events
			"click .closeEditor": "handleClose",
			"click .saveForm": "handleSave",
			"click .deployForm": "handleDeploy",

			//Events for changes in text inputs
			"change #nameInput": "saveFormName",
			"change #descInput": "saveFormDescription",
		},

		handleClose: function() {
			if(formModelHelper.hasBeenSaved) {
				DisplayHelper.switchDisplayedDiv();
			}
			//ask for user confirmation if some form modifs have not been saved yet
			else {
				var confirmation = confirm("Voulez vous vraiment fermer? Le formulaire n'est pas sauvegardé.");
				if(confirmation) {
					DisplayHelper.switchDisplayedDiv();
				}
			}
		},
		
		handleSave: function() {
			//TODO
			//5- loading en attendant callback ajax
			//6- update list of forms

			if(formModelHelper.isNewModel==true) {
				restHelper.requestFormCreation(this.saveCallback);
				formModelHelper.isNewModel = false;
			}
			else {
				restHelper.requestFormSave(this.saveCallback);
			}
		},

		//TODO callback should be to add the new model to the collection of the formListView
		saveCallback: function(data) {
			console.log('callback arrived');
			console.log('callback '+data);
			console.log('callback 1');

			formModelHelper.hasBeenSaved = true;
			window.alert("Votre formulaire a été sauvegardé.");
		},

		handleDeploy: function() {
			//Link with execution application
			//Rest call to create a new Instance in the DB
			
			restHelper.requestFormSave(restHelper.requestInstanceCreation(function(){window.alert('Coucou');}));
		},

		saveFormName: function() {
			formModelHelper.getCurrentFormModel().setName(this.$("#nameInput").val());
		},

		saveFormDescription: function() {
			formModelHelper.getCurrentFormModel().setDescription(this.$("#descInput").val());
		},

	});
});
