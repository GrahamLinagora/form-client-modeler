define([
   "jquery" ,
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
					//TODO case of the inputsize : fieldValue is an array of the different possibilities
					//for the moment such properties are not loaded
				}
				else {
					snippetCopy.fields[fieldValue].value = fieldModel.fieldValues[fieldValue];
				}
			}
			return snippetCopy;
    },

		getSnippetDefaultJSON: function(fieldType) {

//TODO remove trace
console.log("DEBUG "+inputJSON);

			var arrayOfJSONArray = new Array();
			arrayOfJSONArray[0] = this.getNameFieldDefaultJSON();
			arrayOfJSONArray[1] = JSON.parse(radioJSON);
			arrayOfJSONArray[2] = JSON.parse(selectJSON);
			arrayOfJSONArray[3] = JSON.parse(buttonsJSON);
//TODO arrayOfJSONArray[4] = JSON.parse(inputJSON);
//throws error because inputjson is undefined 
//however the data from inputjson is in the array of json whereas buttons are not
//console.log('Debug taboftab : '+JSON.stringify(arrayOfJSONArray));
//console.log('Debug taboftab : '+arrayOfJSONArray.length);


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
