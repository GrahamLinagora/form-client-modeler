define(function(){
	return {
		setCurrentFormModel: function(model) {
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
		}
	};
});
