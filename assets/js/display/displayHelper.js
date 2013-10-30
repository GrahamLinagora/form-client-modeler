define([
	'jquery',
], function($) {
  return {
		currentDivSelector : '#formListDiv',
		otherDivSelector : '#formEditionDiv',

		switchDisplayedDiv: function() {
			$(this.currentDivSelector).hide();
			$(this.otherDivSelector).show();

			var save = this.currentDivSelector;
			this.currentDivSelector = this.otherDivSelector;
			this.otherDivSelector = save;
		},

	}
});
