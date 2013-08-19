define([
   "jquery"
   , "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/buttons.json"
], function(
  $,
  inputJSON,
	radioJSON,
	selectJSON,
	buttonsJSON
){
  return {

    getSnippet: function(fieldModel) {
			//retrieve the default model for the field snippet knowing its fieldType
			var snippet = this.getSnippetDefaultJSON(fieldModel.fieldType);

			//copy this default model and fill it with values form the loading field model
			var snippetCopy = $.extend(true, {}, snippet);

			for(var fieldValue in fieldModel.fieldValues) {
				if(snippetCopy.fields[fieldValue].value instanceof Array) {
					//case of a field whose value is chosen using a select
					//fieldValue is an array of the different possibilities
					for(choiceCpt=0; choiceCpt<snippetCopy.fields[fieldValue].value.length; choiceCpt++) {
						var fieldValueChoice = snippetCopy.fields[fieldValue].value[choiceCpt];
						//reset the default value of the select
						fieldValueChoice.selected = false;
						//if this is the matching choice, make it the value for the select						
						if(fieldValueChoice.value == fieldModel.fieldValues[fieldValue]) {
							fieldValueChoice.selected = true;
						}
					}
				}
				else {
					snippetCopy.fields[fieldValue].value = fieldModel.fieldValues[fieldValue];
				}
			}
			return snippetCopy;
    },

		//searchs the json files containing the field patterns
		//to find the pattern for this field type
		getSnippetDefaultJSON: function(fieldType) {
			var arrayOfJSONArray = new Array();
			arrayOfJSONArray[0] = this.getNameFieldDefaultJSON();
			arrayOfJSONArray[1] = JSON.parse(inputJSON);
			arrayOfJSONArray[2] = JSON.parse(radioJSON);
			arrayOfJSONArray[3] = JSON.parse(selectJSON);
			arrayOfJSONArray[4] = JSON.parse(buttonsJSON);

			for(i=0; i<arrayOfJSONArray.length; i++) {
				var snippetJSON = this.searchJSONArray(arrayOfJSONArray[i], fieldType);
				if(snippetJSON) {
					return snippetJSON;
				}
			}
		},

		searchJSONArray: function(jsonArray, fieldType) {
			for(j=0; j<jsonArray.length; j++) {
				if(jsonArray[j].title == fieldType) {
					return jsonArray[j];
				}
			}
		},

		getNameFieldDefaultJSON: function() {
      return [{ "title" : "Form Name"
        , "fields": {
          "name" : {
            "label"   : "Form Name"
            , "type"  : "input"
            , "value" : "Form Name"
          }
        }
      }];
		}

  }
});
