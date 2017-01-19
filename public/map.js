var office;
var officeLevelsEl;
var officeLevels;
var officeLevelsTotal;
var rooms;
var isExpanded;
var mapContainerEl;
var selected_level;
var loc_id;
var isNavigating;
var levelShowing;


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
		mapContainerEl = document.querySelector('.mapContainer');

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
		// showLevelSpaces();

		// hide the previous level´s rooms
		removeRooms(currentLevel);
	}


	init();

		//Search functionality

	  $('#item-search-btn').click(function(event) {
	    event.preventDefault();
			console.log('click');

	    var searched_item = $('#searched-item').val()
	    var url = '/search';

	    //ajax call to backend to retrieve location
	    $.get(url, {searched_item: searched_item})
	      .done(function(response) {
	        loc_id = response.data_space;
					selected_level = response.selected_level;

	        console.log(loc_id);

	        $('.level__rooms').children().each(function(){
						var svg = $(this).find($('svg'));
						var rect = $(this).find($('rect'));
						var x = rect.attr('x');
						var y = rect.attr('y');
						var location_name = rect.attr('id');

						if (location_name != "NA") {
							showLocationNames(svg, location_name, x, y);
						}

	          if ($(this).data("space") == loc_id) {
	            //open up relevant floor


							if (typeof levelShowing == "undefined") {
								showLocationLevel(selected_level);
							} else if (levelShowing !== selected_level) {
								showAllLevels();
								showLocationLevel(selected_level);
							}

							// showLocationLevel(selected_level);

							var rect = $(this).find('rect')

							animate(selected_level, rect);
	            // highlight location
	            $(this).find($('.cls-1')).css("fill","blue");
	          } else {
	            $(this).find($('.cls-1')).css("fill","white");
	          }
	        });

	      }, "json")
	  });

		function showLocationNames(svg, location_name, x, y) {

		var location_name = location_name;
		var svg = svg;
		var x = x * 1.01;
		var y = y * 1.2;

		var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		text.setAttribute('x', x);
		text.setAttribute('y', y);
		text.setAttribute('fill', '#000');
		text.textContent = location_name;

		svg.append(text);
		console.log(text)

	}

	function showLocationLevel(selected_level) {
		selected_level = selected_level;

		officeLevels.forEach(function(level, pos) {
			if ($(level).data("level") == selected_level) {
				showLevel(pos+1);
				levelShowing = selected_level;
			}
		})
	}

	function animate(selected_level, rect){
		// add in animation
		selected_level = selected_level;

		var x = parseInt(rect.css('x').slice(0,-2))
		var y = parseInt(rect.css('y').slice(0,-2))

		//determine zoom
		var zoom = x/2 + ' ' + y/2 + ' ' + (1366/2) + ' ' + (768/2);

		//zoom up the bottom layer
		var bottomMap = $('.map-map--' + selected_level)[0];

		TweenMax.set(bottomMap,
			{attr: {viewBox: "0 0 1366 768"},
			ease:Power2.easeInOut},
			"+=.5"
		);
		TweenMax.to(bottomMap, 1.5, {attr:
			{ viewBox: zoom }
		});

		//for each svg rectangle in the levels layer, zoom!
		var svgRoot = $('.level--' + selected_level).children().find('svg')

		svgRoot.each(function(index, svg){
				TweenMax.set(svg,
					{attr: {viewBox: "0 0 1366 768"},
					ease:Power2.easeInOut},
					"+=.5"
			);

			TweenMax.to(svg, 1.5, {attr:
				{ viewBox: zoom }
			});
		});
	};

})(window);
