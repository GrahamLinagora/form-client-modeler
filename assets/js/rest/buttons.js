define([
       "jquery", "underscore", "backbone"
      , "helper/pubsub", "rest/formModel", "rest/serverConf"
], function(
  $, _, Backbone
  , PubSub, modelHelper, serverConf
){
  return Backbone.View.extend({
		tagName: "div",
    
		events: {
    	"click .createButton": "requestFormCreation",
    	"click .findButton": "requestFormFind",
    	"click .deleteButton": "requestFormDeletion",
    	"click .loadButton": "requestFormLoad",
  	},

		requestFormCreation: function() {
			var formName = modelHelper.getCurrentFormModel().name;
			var formModel = modelHelper.getCurrentFormModel();

			var form = {
				name : formName,
				model : formModel
			};

			$.ajax({
				type: "POST",
				url: serverConf.getServerRootUrl()+"/forms",
				dataType: "json",
				data: form,
				success: function (data)
				{
					$('#result').text(JSON.stringify(data));
				}
			});
		},

		requestFormDeletion: function() {
			if ($('#input').val().length == 0) {
				return;
			}

			$.ajax({
				type: "DELETE",
				url: serverConf.getServerRootUrl()+"/forms/"+$('#input').val(),
				success: function (data)
				{
					$('#result').text(data);
				}
			});
		},

		requestFormFind: function() {
			$.getJSON(serverConf.getServerRootUrl()+"/forms?name="+$('#input').val(), function (data){
				$('#result').text(JSON.stringify(data));
			});
		},
		
		requestFormLoad: function() {
			if ($('#input').val().length == 0) {
				return;
			}

			var self = this;
			$.getJSON(serverConf.getServerRootUrl()+"/forms/"+$('#input').val(), function (data){
				$('#result').text(JSON.stringify(data));

				modelHelper.setCurrentFormModel(data.model);

				//sends an event which is to be caught by the my-form view to render the form
				PubSub.trigger('loadForm');
			});
		},

	});
});

