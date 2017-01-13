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

		// // click on the show office´s levels ctrl
		// allLevelsCtrl.addEventListener('click', function() {
		// 	// shows all levels
		// 	showAllLevels();
		// });
		//
		// // navigating through the levels
		// levelUpCtrl.addEventListener('click', function() { navigate('Down'); });
		// levelDownCtrl.addEventListener('click', function() { navigate('Up'); });

		// sort by name ctrl - add/remove category name (css pseudo element) from list and sorts the spaces by name
		// sortByNameCtrl.addEventListener('click', function() {
		// 	if( this.checked ) {
		// 		classie.remove(spacesEl, 'grouped-by-category');
		// 		spacesList.sort('list__link');
		// 	}
		// 	else {
		// 		classie.add(spacesEl, 'grouped-by-category');
		// 		spacesList.sort('category');
		// 	}
		// });

		// hovering a room / clicking a room
		// rooms.forEach(function(room) {
		// 	// var contentItem = contentEl.querySelector('.content__item[data-space="' + room.getAttribute('data-space') + '"]');
		//
		// 	room.addEventListener('mouseenter', function() {
		// 		if( !isOpenContentArea ) {
		// 			classie.add(contentItem, 'content__item--hover');
		// 		}
		// 	});
		// 	room.addEventListener('mouseleave', function() {
		// 		if( !isOpenContentArea ) {
		// 			classie.remove(contentItem, 'content__item--hover');
		// 		}
		// 	});
		// 	room.addEventListener('click', function(ev) {
		// 		ev.preventDefault();
		// 		// open content for this room
		// 		openContent(room.getAttribute('data-space'));
		// 		// remove hover class (showing the title)
		// 		classie.remove(contentItem, 'content__item--hover');
		// 	});
		// });

		// closing the content area
		// contentCloseCtrl.addEventListener('click', function() {
		// 	closeContentArea();
		// });
		//
		// // clicking on a listed space: open level - shows space
		// spaces.forEach(function(space) {
		// 	var spaceItem = space.parentNode,
		// 		level = spaceItem.getAttribute('data-level'),
		// 		spacerefval = spaceItem.getAttribute('data-space');
		//
		// 	space.addEventListener('click', function(ev) {
		// 		ev.preventDefault();
		// 		// for sofficeer screens: close search bar
		// 		closeSearch();
		// 		// open level
		// 		showLevel(level);
		// 		// open content for this space
		// 		openContent(spacerefval);
		// 	});
		// });
		//
		// // sofficeer screens: open the search bar
		// openSearchCtrl.addEventListener('click', function() {
		// 	openSearch();
		// });
		//
		// // sofficeer screens: close the search bar
		// closeSearchCtrl.addEventListener('click', function() {
		// 	closeSearch();
		// });
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
		highlightRoom();

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

	/**
	 * Control navigation ctrls state. Add disable class to the respective ctrl when the current level is either the first or the last.
	//  */
	// function setNavigationState() {
	// 	if( selectedLevel == 1 ) {
	// 		classie.add(levelDownCtrl, 'boxbutton--disabled');
	// 	}
	// 	else {
	// 		classie.remove(levelDownCtrl, 'boxbutton--disabled');
	// 	}
	//
	// 	if( selectedLevel == officeLevelsTotal ) {
	// 		classie.add(levelUpCtrl, 'boxbutton--disabled');
	// 	}
	// 	else {
	// 		classie.remove(levelUpCtrl, 'boxbutton--disabled');
	// 	}
	// }
	//
	// /**
	//  * Opens/Reveals a content item.
	//  */
	// function openContent(spacerefval) {
	// 	// if one already shown:
	// 	if( isOpenContentArea ) {
	// 		hideSpace();
	// 		spaceref = spacerefval;
	// 		showSpace();
	// 	}
	// 	else {
	// 		spaceref = spacerefval;
	// 		openContentArea();
	// 	}
	//
	// 	// remove class active (if any) from current list item
	// 	var activeItem = spacesEl.querySelector('li.list__item--active');
	// 	if( activeItem ) {
	// 		classie.remove(activeItem, 'list__item--active');
	// 	}
	// 	// list item gets class active (if the list item is currently shown in the list)
	// 	var listItem = spacesEl.querySelector('li[data-space="' + spacerefval + '"]')
	// 	if( listItem ) {
	// 		classie.add(listItem, 'list__item--active');
	// 	}
	//
	// 	// remove class selected (if any) from current space
	// 	var activeSpaceArea = officeLevels[selectedLevel - 1].querySelector('svg > .map__space--selected');
	// 	if( activeSpaceArea ) {
	// 		classie.remove(activeSpaceArea, 'map__space--selected');
	// 	}
	// 	// svg area gets selected
	// 	classie.add(officeLevels[selectedLevel - 1].querySelector('svg > .map__space[data-space="' + spaceref + '"]'), 'map__space--selected');
	// }

	/**
	 * Opens the content area.
	 */
	// function openContentArea() {
	// 	isOpenContentArea = true;
	// 	// shows space
	// 	showSpace(true);
	// 	// show close ctrl
	// 	classie.remove(contentCloseCtrl, 'content__button--hidden');
	// 	// resize office area
	// 	classie.add(office, 'office--content-open');
	// 	// disable office nav ctrls
	// 	classie.add(levelDownCtrl, 'boxbutton--disabled');
	// 	classie.add(levelUpCtrl, 'boxbutton--disabled');
	// }

	/**
	 * Shows a space.
	 */
	// function showSpace(sliding) {
	// 	// the content item
	// 	var contentItem = contentEl.querySelector('.content__item[data-space="' + spaceref + '"]');
	// 	// show content
	// 	classie.add(contentItem, 'content__item--current');
	// 	if( sliding ) {
	// 		onEndTransition(contentItem, function() {
	// 			classie.add(contentEl, 'content--open');
	// 		});
	// 	}
	// 	// map room gets selected
	// 	classie.add(officeLevelsEl.querySelector('.room[data-space="' + spaceref + '"]'), 'room--active');
	// }

	/**
	 * Closes the content area.
	 */
	// function closeContentArea() {
	// 	classie.remove(contentEl, 'content--open');
	// 	// close current space
	// 	hideSpace();
	// 	// hide close ctrl
	// 	classie.add(contentCloseCtrl, 'content__button--hidden');
	// 	// resize office area
	// 	classie.remove(office, 'office--content-open');
	// 	// enable office nav ctrls
	// 	if( isExpanded ) {
	// 		setNavigationState();
	// 	}
	// 	isOpenContentArea = false;
	// }

	/**
	 * Hides a space.
	 */
	// function hideSpace() {
	// 	// the content item
	// 	var contentItem = contentEl.querySelector('.content__item[data-space="' + spaceref + '"]');
	// 	// hide content
	// 	classie.remove(contentItem, 'content__item--current');
	// 	// map room gets unselected
	// 	classie.remove(officeLevelsEl.querySelector('.room[data-space="' + spaceref + '"]'), 'room--active');
	// 	// remove class active (if any) from current list item
	// 	var activeItem = spacesEl.querySelector('li.list__item--active');
	// 	if( activeItem ) {
	// 		classie.remove(activeItem, 'list__item--active');
	// 	}
	// 	// remove class selected (if any) from current space
	// 	var activeSpaceArea = officeLevels[selectedLevel - 1].querySelector('svg > .map__space--selected');
	// 	if( activeSpaceArea ) {
	// 		classie.remove(activeSpaceArea, 'map__space--selected');
	// 	}
	// }

	/**
	 * for sofficeer screens: open search bar
	 */
	// function openSearch() {
	// 	// shows all levels - we want to show all the spaces for sofficeer screens
	// 	showAllLevels();
	//
	// 	classie.add(spacesListEl, 'spaces-list--open');
	// 	classie.add(containerEl, 'container--overflow');
	// }
	//
	// /**
	//  * for sofficeer screens: close search bar
	//  */
	// function closeSearch() {
	// 	classie.remove(spacesListEl, 'spaces-list--open');
	// 	classie.remove(containerEl, 'container--overflow');
	// }

	function highlightRoom() {
		console.log('hit highlight')
		$('.level__rooms').children().each(function(){
			//to add in ajax call  to back end and back end logic for retrieving room data
			if ($(this).data("space") == 1) {
				$(this).find($('.cls-1-4')).css("fill","blue")
			}
		});
	}

	init();

})(window);
