/**
 *	Seeems taks solution
 * =============================================================
 * @author Dimitar Musev
 * 21.11.2016 / 11:37
 *
 * Seeems tasks solution given on the interview
 *
 */
//-------------------------------------------------------------------------------------
(function() {"use strict";

	var
		boxClick,
		removeExp, applyExp,
		removeDbl, applyDbl,
		currentExpandedElem, currentDblElem,
		clearState, setState
	;

	/**
	 * Clears state of given elements and executes callback if passed
	 * @param  {[type]}   expElem  [description]
	 * @param  {[type]}   dblElem  [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	clearState = function(expElem, dblElem, callback) {
		removeExp(expElem);
		removeDbl(dblElem);

		if(callback) callback();
	}

	/**
	 * Set state of given elements
	 * @param {[type]} expElem [description]
	 * @param {[type]} dblElem [description]
	 */
	setState = function(expElem, dblElem) {
		removeDbl(expElem, function() {
			applyExp(expElem);
		});
		removeExp(dblElem, function() {
			applyDbl(dblElem);
		});
	}

	/**
	 * Removing expansion helper function
	 * @param  {[type]}   elem     [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	removeExp = function(elem, callback) {
		if($(elem).hasClass('expanded')) $(elem).removeClass('expanded')
		$(elem).text('');

		if(callback) callback();
	}

	/**
	 * Applying expansion helper function
	 * @param  {[type]} elem [description]
	 * @return {[type]}      [description]
	 */
	applyExp = function(elem) {
		$(elem).addClass('expanded');
		$(elem).text('Expanded');
	}

	/**
	 * Removing double state helper function
	 * @param  {[type]}   elem     [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	removeDbl = function(elem, callback) {
		if($(elem).hasClass('double')) $(elem).removeClass('double')
		$(elem).text('');

		if(callback) callback();
	}

	/**
	 * Applying double state helper function
	 * @param  {[type]} elem [description]
	 * @return {[type]}      [description]
	 */
	applyDbl = function(elem) {
		$(elem).addClass('double');
		$(elem).text('Double');
	}

	/**
	 * Main box click handler
	 * @param  {[type]} elem [description]
	 * @return {[type]}      [description]
	 */
	boxClick = function(elem) {
		var 
			tempExpElem, tempDblElem
		;
		tempExpElem = elem;
		tempDblElem = ($(elem).next('span')[0] ? $(elem).next('span')[0] : $(elem).prev('span')[0]);

		if(currentExpandedElem !== tempExpElem) {
			clearState(currentExpandedElem, currentDblElem, function() {
				 setState(tempExpElem, tempDblElem);
			});
			currentExpandedElem = tempExpElem;
			currentDblElem = tempDblElem;
		}else{
			clearState(currentExpandedElem, currentDblElem);
			currentExpandedElem = null;
			currentDblElem = null;		
		}
	}

	//Attach event on click on every box class element when page is loaded
	$(document).ready(function () {
	    $(".box").on("click", function(){
			boxClick(this);
		})
	}); 
})();