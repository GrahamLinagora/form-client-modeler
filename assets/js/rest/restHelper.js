define([
	"jquery",
	"helper/pubsub",
	"rest/formModelHelper",
	"rest/serverConf"
], function(
  $, PubSub, formModelHelper, serverConf
){
  return {

		requestFormCreation: function(creationCallback) {
			var form = {
				'name' : formModelHelper.getCurrentFormModel().getName(),
				'description' : formModelHelper.getCurrentFormModel().getDescription(),
				'model' : formModelHelper.getCurrentFormModel().getFields()
			};

			$.ajax({
				type: "POST",
				url: serverConf.getServerRootUrl()+"/forms",
				dataType: "json",
				data: form,
				success: function (data)
				{
					creationCallback(data);
				}
			});
		},

		requestFormSave: function(saveCallback) {
			var form = formModelHelper.getCurrentFormModel();
			$.ajax({
				type: "POST",
				url: serverConf.getServerRootUrl()+"/forms/"+formModelHelper.getCurrentFormModel().getId(),
				dataType: "json",
				data: form,
				success: function (savedForm)
				{
					saveCallback(savedForm);
				}
			});
		},

		requestFormDeletion: function(formId,callback) {
			$.ajax({
				type: "DELETE",
				url: serverConf.getServerRootUrl()+"/forms/"+formId,
				success: function (data)
				{
					callback(data);
				}
			});
		},

		requestInstanceCreation: function(creationCallback) {
			var instance = {
				'name' : formModelHelper.getCurrentFormModel().getName(),
				'description' : formModelHelper.getCurrentFormModel().getDescription(),
				'form' : formModelHelper.getCurrentFormModel().getId()
			};

			$.ajax({
				type: "POST",
				url: serverConf.getServerRootUrl()+"/instances",
				dataType: "json",
				data: instance,
				success: function (data)
				{
					creationCallback(data);
				}
			});
		},

	};
});

