/* ==========================================================
 * Copyright 2011 Polycot Labs, LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


var max_zIndex = 100000;// one var for max zindex for the navigation buttons to be always most on the top

var swiped_x,swiped_y;

var Scene  = function( options ) {
	var swiped = false; // we need this flag to treat touchend even right if the scene is swiped
	var swiped_dir = false; // the direction of the swipe gesture

	var scene_win = new rel('window', { //create the scene window
		orientationModes:[Titanium.UI.LANDSCAPE_LEFT],
		width:(platform == 'iphone') ? 480 : 1024,
		height:(platform == 'iphone') ? 320 : 768

		// debug
		// ,
		// borderWidth:3,
		// borderColor:bgds[story.current_id]
	}, {
		touchstart: function(e) {
			swiped_x = e.x;
			swiped_y = e.y;
		},
		touchend: function(e) {
			
			end_swiped_x = e.x;
			end_swiped_y = e.y;

			if ( end_swiped_x-swiped_x > 30 ) {
				swiped_dir = 'right';
				swiped =  true;
			} else if ( end_swiped_x-swiped_x < -30 ) {
				swiped_dir = 'left';
				swiped =  true;
			} else {
				swiped =  false;
				swiped_dir =  false,
				swiped_x = null;
				end_swiped_x =  null;
			}
			// how do we separate this?
			log(swiped+' '+swiped_dir);
			if ( !swiped ) {

				out.show_navigation();
				setTimeout( function() {
					out.hide_navigation();
				}, 5000); // to add control for cleaning the timeout in case of retouch
			} else {

				var swipe_go = (swiped_dir == 'right' ) ? 'prev' : 'next';

				if ( out.branches ) {
					if ( this.current_sound )
						this.current_sound.release();
					out.branches_view.animate(fade_in);
				} else {
					story[swipe_go](story.scenes_arr);
				}

				// story_go( swipe_go );
				out.hide_navigation();
			}
		}// ,
		// 		swipe: function(ev) {
		//
		// 			swiped = true;
		// 			swiped_dir = ev.direction;
		// 			log(swiped+' '+swiped_dir);
		// 		}
	});

	var background =  new rel('img', { // we create the scene bgd
		url:options.bg_image,
		width:options.bg_width,
		height:options.bg_height,
		top:options.top || 0,
		left:options.left || 0
	}).inject(scene_win);
	if ( options.branches ) {
		var branches_view =  new rel('view', {
			top:0,
			left:0,
			width:480,
			height:320,
			backgroundColor:'#f00',
			opacity:0
		}).inject(scene_win)

		setTimeout( function() {
			branches_view.animate({
				zIndex:max_zIndex+1
			});// the views does not respect zIndex so we have to do this  -  I think will be fixed in next release of Titanium
		}, 50);
		if (options.branches.length) {
			for (var i=0; i < options.branches.length; i++) {
				var but_opts = story_branch_scenes[options.branches[i]].button;
				but_opts.scene_name = options.branches[i];

				if ( story_branch_scenes[but_opts.scene_name].follow_scene ) {
					var follow_scene = story_branch_scenes[but_opts.scene_name].follow_scene;

					var last_scene = story_branch_scenes[but_opts.scene_name].scenes.length-1;
					var last_line = story_branch_scenes[but_opts.scene_name].scenes[last_scene].lines.length-1;
					var old_end = story_branch_scenes[but_opts.scene_name].scenes[last_scene].lines[last_line].end;

					story_branch_scenes[but_opts.scene_name].scenes[last_scene].lines[last_line].end = function() {
						old_end();
						setTimeout( function() {
							story.start( follow_scene.id,follow_scene.scene_arr );
						}, 500);
					}
				};

				new rel('img', but_opts, {
					click: function(e) {
						out.branches_view.animate(fade_out);
						setTimeout( function() {
							story.start( 0 , story_branch_scenes[e.source.scene_name].scenes );
						}, 500);
					}
				}).inject(branches_view);

				var but_opts = null;
			};
		}
	}

	if ( globals.subtitles ) {
		
		var subtitles_view = new rel('view', {
			top:(platform == 'iphone') ? 240 : 600,
			height:(platform == 'iphone') ? 75 : 150,
			width:(platform == 'iphone') ? 460 : 984,
			left:(platform == 'iphone') ? 10 : 20,
			zIndex:10
		}).inject(scene_win);

		var subtitles = new rel('label', {
			font: {
				fontSize:(platform == 'iphone') ? 13 : 26
			},
			color:'#fff',
			backgroundColor:'#000',
			opacity:0.7,
			text:' ',
			textAlign:'center',
			borderRadius: (platform == 'iphone') ? 5 : 10
		}).inject(subtitles_view);

		setTimeout( function() {
			subtitles_view.animate({
				zIndex:max_zIndex-1
			});// the views does not respect zIndex so we have to do this  -  I think will be fixed in next release of Titanium
		}, 100);
	}

	// branches navigation

	// navigation elements ===========================================

	var navigation_view =  new rel('view', {
		top:0,
		left:0,
		height:(platform == 'iphone') ? 320 : 768,
		width:(platform == 'iphone') ? 480 : 1024,
		opacity:0
	}).inject(scene_win)

	setTimeout( function() {
		navigation_view.animate({
			zIndex:max_zIndex
		});// the views does not respect zIndex so we have to do this  -  I think will be fixed in next release of Titanium
	}, 50);
	var go_prev = new rel('img',
	globals.go_prev, {
		click: function() {
			if ( out.branches ) {
				if ( out.current_sound )
					out.current_sound.release();

				for ( tm in story.timeouts ) {
					myClearTimeout(tm);
				};

				out.hide_navigation();
				out.branches_view.animate(fade_in);

			} else {
				out.hide_navigation();
				story.prev(story.scenes_arr);
			}

		}
	}).inject(navigation_view);

	var go_next = new rel('img',
	globals.go_next, {
		click: function() {
			if ( out.branches ) {

				if ( out.current_sound )
					out.current_sound.release();

				for ( tm in story.timeouts ) {
					log(tm);
					myClearTimeout(tm);
				};

				out.hide_navigation();
				out.branches_view.animate(fade_in);
			} else {
				out.hide_navigation();
				story.next(story.scenes_arr);
			}

		}
	}).inject(navigation_view);

	var go_home = new rel('img',
	globals.go_home, {
		click: function() {
			story.stop();
		}
	}).inject(navigation_view);

	var go_pause = new rel('img',
	globals.go_pause, {
		click: function() {
			go_pause.hide();
			go_play.show();
			story.pause();
			out.is_paused = true;
		}
	}).inject(navigation_view);

	var go_play = new rel('img',
	globals.go_play, {
		click: function() {
			go_play.hide();
			go_pause.show();
			story.pause();
			out.is_paused = false;
			out.hide_navigation();
		}
	}).inject(navigation_view);
	go_play.hide();

	// output of the function

	var out = {
		scene_win:scene_win,
		subtitles:subtitles,
		lines:options.lines,
		branches:options.branches || null,
		branches_view:branches_view,
		is_paused: false,

		navigation_view:navigation_view,

		bgd:background,
		go_prev:go_prev,
		go_next:go_next,
		go_home:go_home,

		open: function(args) {
			scene_win.open(args);
			return this;
		},
		hide_navigation: function() {
			swiped = false;
			log("trying to hide " +this.is_paused);
			if (this.is_paused == false)
				this.navigation_view.animate(fade_out);
			return this;
		},
		show_navigation: function() {
			this.navigation_view.animate(fade_in);
			return this;
		},
		hide_branches: function() {
			swiped = false;
			this.branches_view.animate(fade_out);
			return this;
		},
		show_branches: function() {
			this.branches_view.animate(fade_in);
			return this;
		},
		add_sound: function( snd , onComplete) { // we add a sound to the scene

			return this;
		},
		add_object : function( obj ) { // we add an object to the scene
			obj.move_to = function( x , y , duration, onComplete, delay) {
				obj.animate( move_to(x,y,duration,onComplete,delay ) );
			};
			obj.spin_v = function(repeat,reverse,duration,onComplete,delay) {
				obj.animate(spin_v(repeat,reverse,duration,onComplete,delay) );
			};
			this.scene_win.add(obj);
			return this;
		},
		play: function(i) {
			var i = !!i ? i : 0;
			if (current_spoken == 'Not Listed')
				current_spoken = 'no-name';

			if (isArray(this.lines[i].text))
				if (current_spoken == 'no-name')
					var text = globals.sound ? this.lines[i].text[1] : this.lines[i].text[0];
				else
					var text = this.lines[i].text[0];
			else
				var text = this.lines[i].text;


			text = text.replace("#current_name",current_name);
			text = text.replace("#current_hair",current_hair);
			text = text.replace("#current_gender",current_gender);
			if (current_gender == 'boy')
				text = text.replace('#current_pronoun','He');
			if (current_gender == 'girl')
				text = text.replace('#current_pronoun','She');
			text = text.replace("#current_skin",current_skin);

			if ( globals.subtitles )
				subtitles.set('text',text);

			var volume = globals.sound ? 1.0 : 0.0;

			if ( this.current_sound )
				this.current_sound.release();

			var sound = this.lines[i].sound;
			
			sound = sound.replace("#current_spoken",current_spoken);
			sound = sound.replace("#current_gender",current_gender);

			this.current_sound = new rsnd(sound,volume).addEvent('complete', function() {

				out.lines[i].end();
				if ( out.lines[i+1] )
					out.play(i+1);
				else {
					if ( globals.autoplay ) {
						if ( out.branches ) {
							out.branches_view.animate(fade_in);

						} else {
							log('next scene');
							story.next(story.scenes_arr);
						}
					} else {
						!!out.branches ?  log('branches'+out.branches.length) : log('branches none');
					}
				};

			}).play();
			this.lines[i].start();

			return this;
		},
		close: function(args) {

			this.scene_win.close(args);
			return this;
		}
	};

	options.init.call(out);
	return  out;
};