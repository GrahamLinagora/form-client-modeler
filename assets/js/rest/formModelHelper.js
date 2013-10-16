define([
	"jquery",
	"display/formModel",
	'text!rest/newFormModel.json'
],function($, FormModel, NewFormModelJSON){
	return {
		isNewModel: false,
		hasBeenSaved: false,
	
		setCurrentFormModel: function(model) {
			this.currentFormModel = model;
			this.hasBeenSaved = false;
		},
		getCurrentFormModel: function() {
			return this.currentFormModel;
		},

		resetFormModel : function() {
			this.setCurrentFormModel(new FormModel(JSON.parse(NewFormModelJSON)));
			this.isNewModel = true;
		},

		buildFormFields: function(fieldModelsArray) {
			var formModel = new Object();
			for(i=0; i<fieldModelsArray.length; i++) {
				formModel['field'+i] = fieldModelsArray[i];
			}
			return formModel;
		},

	};
});
