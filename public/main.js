
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
		office = document.querySelector('.office'),
		officeLevelsEl = office.querySelector('.levels'),
		officeLevels = [].slice.call(officeLevelsEl.querySelectorAll('.level')),
		officeLevelsTotal = officeLevels.length,
		selectedLevel,
		rooms = [].slice.call(officeLevelsEl.querySelectorAll('.room')),
		isExpanded,
		containerEl = document.querySelector('.container');

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


	function showLevel(level) {
		if( isExpanded ) {
			return false;
		}

		// update selected level val
		selectedLevel = level;


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

	}

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


	}

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
