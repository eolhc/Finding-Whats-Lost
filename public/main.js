/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	// helper functions
	// from https://davidwalsh.name/vendor-prefix
	var prefix = (function () {
		var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

		return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		};
	})();

	// vars & stuff
	var support = {transitions : Modernizr.csstransitions},
		transEndEventNames = {'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend'},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		onEndTransition = function(el, callback, propTest) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this || propTest && ev.propertyName !== propTest && ev.propertyName !== prefix.css + propTest ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		},
		// the office element
		office = document.querySelector('.office'),
		// office´s levels wrapper
		officeLevelsEl = office.querySelector('.levels'),
		// office´s levels
		officeLevels = [].slice.call(officeLevelsEl.querySelectorAll('.level')),
		// total levels
		officeLevelsTotal = officeLevels.length,
		// // surroundings elems
		// officeSurroundings = [].slice.call(office.querySelectorAll('.surroundings')),
		// selected level position
		selectedLevel,
		// navigation element wrapper
		// officeNav = document.querySelector('.officenav'),
		// // show all office´s levels ctrl
		// allLevelsCtrl = officeNav.querySelector('.officenav__button--all-levels'),
		// // levels navigation up/down ctrls
		// levelUpCtrl = officeNav.querySelector('.officenav__button--up'),
		// levelDownCtrl = officeNav.querySelector('.officenav__button--down'),
		// rooms
		rooms = [].slice.call(officeLevelsEl.querySelectorAll('.room')),
		// content element
		// contentEl = document.querySelector('.content'),
		// // content close ctrl
		// contentCloseCtrl = contentEl.querySelector('button.content__button'),
		// // check if a content item is opened
		// isOpenContentArea,
		// // check if currently animating/navigating
		// isNavigating,
		// // check if all levels are shown or if one level is shown (expanded)
		isExpanded,
		// // spaces list element
		// spacesListEl = document.getElementById('spaces-list'),
		// // spaces list ul
		// spacesEl = spacesListEl.querySelector('ul.list'),
		// // all the spaces listed
		// spaces = [].slice.call(spacesEl.querySelectorAll('.list__item > a.list__link')),
		// // reference to the current shows space (name set in the data-name attr of both the listed spaces and the rooms on the map)
		// spaceref,
		// // sort by ctrls
		// sortByNameCtrl = document.querySelector('#sort-by-name'),
		// // listjs initiliazation (all office´s spaces)
		// spacesList = new List('spaces-list', { valueNames: ['list__link', { data: ['level'] }, { data: ['category'] } ]} ),

		// sofficeer screens:
		// open search ctrl
		// openSearchCtrl = document.querySelector('button.open-search'),
		// main container
		containerEl = document.querySelector('.container');
		// close search ctrl
		// closeSearchCtrl = spacesListEl.querySelector('button.close-search');

	function init() {
		// init/bind events
		initEvents();
	}

	/**
	 * Initialize/Bind events fn.
	 */
	function initEvents() {
		// click on a Mall´s level
		officeLevels.forEach(function(level, pos) {
			level.addEventListener('click', function() {
				// shows this level
				showLevel(pos+1);
			});
		});
	}

	/**
	 * Opens a level. The current level moves to the center while the other ones move away.
	 */
	function showLevel(level) {
		if( isExpanded ) {
			return false;
		}

		// update selected level val
		selectedLevel = level;

		// control navigation controls state
		// setNavigationState();

		classie.add(officeLevelsEl, 'levels--selected-' + selectedLevel);

		// the level element
		var levelEl = officeLevels[selectedLevel - 1];
		classie.add(levelEl, 'level--current');

		onEndTransition(levelEl, function() {
			classie.add(officeLevelsEl, 'levels--open');

			// show level rooms
			showRooms();

			isExpanded = true;
		}, 'transform');

		// hide surroundings element
		// hideSurroundings();

		// show office nav ctrls
		// showMallNav();

		// filter the spaces for this level
		// showLevelSpaces();
	}

	/**
	 * Shows all Mall´s levels
	 */
	function showAllLevels() {
		if( isNavigating || !isExpanded ) {
			return false;
		}
		isExpanded = false;

		classie.remove(officeLevels[selectedLevel - 1], 'level--current');
		classie.remove(officeLevelsEl, 'levels--selected-' + selectedLevel);
		classie.remove(officeLevelsEl, 'levels--open');

		// hide level rooms
		removeRooms();

		// shows surrounding element
		// showSurroundings();

		// hide office nav ctrls
		// hideMallNav();

		// show back the complete list of spaces
		// spacesList.filter();

		// close content area if it is open
		// if( isOpenContentArea ) {
		// 	closeContentArea();
		// }
	}

	/**
	 * Shows all spaces for current level
	 */
	// function showLevelSpaces() {
	// 	spacesList.filter(function(item) {
	// 		return item.values().level === selectedLevel.toString();
	// 	});
	// }

	/**
	 * Shows the level´s rooms
	 */
	function showRooms() {
		var levelEl = levelEl || officeLevels[selectedLevel - 1];
		classie.add(levelEl.querySelector('.level__rooms'), 'level__rooms--active');

	}

	/**
	 * Removes the level´s rooms
	 */
	function removeRooms(levelEl) {
		var levelEl = levelEl || officeLevels[selectedLevel - 1];
		classie.remove(levelEl.querySelector('.level__rooms'), 'level__rooms--active');
	}

	/**
	 * Show the navigation ctrls
	 */
	// function showMallNav() {
	// 	classie.remove(officeNav, 'officenav--hidden');
	// }

	/**
	 * Hide the navigation ctrls
	 */
	// function hideMallNav() {
	// 	classie.add(officeNav, 'officenav--hidden');
	// }

	/**
	 * Show the surroundings level
	 */
	// function showSurroundings() {
	// 	officeSurroundings.forEach(function(el) {
	// 		classie.remove(el, 'surroundings--hidden');
	// 	});
	// }

	/**
	 * Hide the surroundings level
	 */
	// function hideSurroundings() {
	// 	officeSurroundings.forEach(function(el) {
	// 		classie.add(el, 'surroundings--hidden');
	// 	});
	// }

	/**
	 * Navigate through the office´s levels
	 */
	function navigate(direction) {
		if( isNavigating || !isExpanded || isOpenContentArea ) {
			return false;
		}
		isNavigating = true;

		var prevSelectedLevel = selectedLevel;

		// current level
		var currentLevel = officeLevels[prevSelectedLevel-1];

		if( direction === 'Up' && prevSelectedLevel > 1 ) {
			--selectedLevel;
		}
		else if( direction === 'Down' && prevSelectedLevel < officeLevelsTotal ) {
			++selectedLevel;
		}
		else {
			isNavigating = false;
			return false;
		}

		// control navigation controls state (enabled/disabled)
		setNavigationState();
		// transition direction class
		classie.add(currentLevel, 'level--moveOut' + direction);
		// next level element
		var nextLevel = officeLevels[selectedLevel-1]
		// ..becomes the current one
		classie.add(nextLevel, 'level--current');

		// when the transition ends..
		onEndTransition(currentLevel, function() {
			classie.remove(currentLevel, 'level--moveOut' + direction);
			// solves rendering bug for the SVG opacity-fill property
			setTimeout(function() {classie.remove(currentLevel, 'level--current');}, 60);

			classie.remove(officeLevelsEl, 'levels--selected-' + prevSelectedLevel);
			classie.add(officeLevelsEl, 'levels--selected-' + selectedLevel);

			// show the current level´s rooms
			showRooms();

			isNavigating = false;
		});

		// filter the spaces for this level
		showLevelSpaces();

		// hide the previous level´s rooms
		removeRooms(currentLevel);
	}


	init();

})(window);
