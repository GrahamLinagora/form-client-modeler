define(["jquery"],function($){
	return {
		setCurrentFormModel: function(model) {
			//TODO remove trace
			console.log("MODEL : "+JSON.stringify(model));
			this.currentFormModel = model;
		},

		getCurrentFormModel: function() {
			return this.currentFormModel;
		},

		buildFormModel: function(fieldModelsArray) {
			var formModel = new Object();
			for(i=0; i<fieldModelsArray.length; i++) {
				formModel['field'+i] = fieldModelsArray[i];
			}
			return formModel;
		},

		getCurrentFormName: function() {
			var formName;
			$.each(this.currentFormModel, function(key, value) {
				if(value.fieldType == "Form Name") {
					formName = value.fieldValues["name"];
				}
			});
			return formName;
		}
	};
});
