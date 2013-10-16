define([
	"jquery", "underscore", "backbone"
	, "views/temp-snippet"
	, "helper/pubsub"
	, "text!templates/app/renderform.html"
	, "rest/formModelHelper"
	, "rest/snippetHelper"
], function(
  $, _, Backbone
  , TempSnippetView
  , PubSub
  , _renderForm
	, formModelHelper
	, snippetHelper
){
  return Backbone.View.extend({
    tagName: "fieldset"
    , initialize: function(){
      this.collection.on("add", this.render, this);
      this.collection.on("remove", this.render, this);
      this.collection.on("change", this.render, this);
			
			//NEW : whenever the built collection of snippets changes : build and save the model of the form
      this.collection.on("add", this.saveFormModel, this);
      this.collection.on("remove", this.saveFormModel, this);
			this.collection.on("change", this.saveFormModel, this);

			//NEW : define the custom "load" event to load a form when this event is triggered
			//NB. the third argument this is mandatory in order to be able to access the collection in the loadForm method
      PubSub.on("loadForm", this.loadForm, this);

      PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
      PubSub.on("tempMove", this.handleTempMove, this);
      PubSub.on("tempDrop", this.handleTempDrop, this);
      this.$build = $("#build");
      this.renderForm = _.template(_renderForm);
      this.render();
    }

    , render: function(){
      //Render Snippet Views
      this.$el.empty();
      var that = this;
      _.each(this.collection.renderAll(), function(snippet){
        that.$el.append(snippet);
      });
      $("#render").val(that.renderForm({
        text: _.map(this.collection.renderAllClean(), function(e){return e.html()}).join("\n")
      }));
      this.$el.appendTo("#build form");
      this.delegateEvents();
    }

		//NEW : function that saves the formModel in a helper for the rest handler
		, saveFormModel: function() {
			var fieldsToSave = formModelHelper.buildFormFields(this.collection.getFieldModels());
			formModelHelper.getCurrentFormModel().setFields(fieldsToSave);
		}

		//NEW : loads a form in the editor
		, loadForm: function(model) {
			var fieldsToLoad = formModelHelper.getCurrentFormModel().getFields();

			//first empty the collection
			this.collection.reset();

			//for each field model, build the corresponding snippet and add it to the collection
			var fieldCpt=0;
			while(fieldsToLoad['field'+fieldCpt]) {
				var snippet = snippetHelper.getSnippet(fieldsToLoad['field'+fieldCpt]);
				this.collection.add(snippet);
				fieldCpt++;
			}
		}

    , getBottomAbove: function(eventY){
      var myFormBits = $(this.$el.find(".component"));
      var topelement = _.find(myFormBits, function(renderedSnippet) {
        if (($(renderedSnippet).position().top + $(renderedSnippet).height()) > eventY  - 90) {
          return true;
        }
        else {
          return false;
        }
      });
      if (topelement){
        return topelement;
      } else {
        return myFormBits[0];
      }
    }

    , handleSnippetDrag: function(mouseEvent, snippetModel) {
      $("body").append(new TempSnippetView({model: snippetModel}).render());
      this.collection.remove(snippetModel);
      PubSub.trigger("newTempPostRender", mouseEvent);
    }

    , handleTempMove: function(mouseEvent){
      $(".target").removeClass("target");
      if(mouseEvent.pageX >= this.$build.position().left &&
          mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
          mouseEvent.pageY >= this.$build.position().top &&
          mouseEvent.pageY < (this.$build.height() + this.$build.position().top)){
        $(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
      } else {
        $(".target").removeClass("target");
      }
    }

    , handleTempDrop: function(mouseEvent, model, index){
      if(mouseEvent.pageX >= this.$build.position().left &&
         mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
         mouseEvent.pageY >= this.$build.position().top &&
         mouseEvent.pageY < (this.$build.height() + this.$build.position().top)) {
        var index = $(".target").index();
        $(".target").removeClass("target");
        this.collection.add(model,{at: index+1});
      } else {
        $(".target").removeClass("target");
      }
    }
  })
});
