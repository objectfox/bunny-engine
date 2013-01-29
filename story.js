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


// the story is an object that retains an array with scenes.
// is an object for further development , maybe we will add other elements like story.cover, etc..

// each scene has lines.
// a line is a sound or more sounds that are reflected into the subtitles.
// because of the fact that a line sound will always be longer than any animation we'll do

var story = {
	timeouts:[],
	start: function(id, scenes_arr) {
		Titanium.App.idleTimerDisabled = true;
		bgPlayer.pause();
		globals.current_scene = id;
		this.scenes_arr  = !!scenes_arr ? scenes_arr : story_main_scenes;

		for ( tm in this.timeouts ) {
			myClearTimeout(tm);
		};

		if (this.playing_scene && this.playing_scene.current_sound ) {
			this.playing_scene.current_sound.stop().release();

			this.old_playing_scene =  this.playing_scene;
		}

		var id = (!!id) ? id : 0;

		this.current_id = id;

		this.playing_scene = new Scene(this.scenes_arr[id]);

		if ( this.current_id == 0 && !this.navigated ) {
			this.playing_scene.open({
				transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});

			setTimeout( function() {
				story.playing_scene.play();

				if ( story.old_playing_scene_win) {
					story.old_playing_scene.close();

				}

			}, 1000);
		} else {
			story.playing_scene.open().play();

			// story.old_playing_win.close();
			story.old_playing_scene.close();
		}

	},
	next: function(scenes_arr) {

		log('story.next '+this.current_id+' '+scenes_arr.length);
		if ( this.current_id < scenes_arr.length-1 ) {  // why -1 ? with branches seemed to work -  to verify
			this.navigated =  true; // set to know we hit the navigation
			this.start(this.current_id+1,scenes_arr);
		} else {
			this.stop();
		}
	},
	prev: function(scenes_arr) {
		if ( this.current_id > 0 ) {
			this.navigated =  true; // set to know we hit the navigation
			this.start(this.current_id-1, this.scenes_arr);
		}
	},
	pause: function() {
		if ( this.playing_scene.current_sound.isPaused() ) {
			this.playing_scene.current_sound.resume();
			Titanium.App.idleTimerDisabled = true;
		} else {
			this.playing_scene.current_sound.pause();
			Titanium.App.idleTimerDisabled = false;
		}
	},
	stop: function() {

		Titanium.App.idleTimerDisabled = false;
		bgPlayer.play();
		this.navigated =  false; // set to know we hit the navigation
		this.playing_scene.current_sound.stop().release();
		///Changed...
		//menu_win.set('opacity',1);
		menu_win.opacity = 1;
		// this.playing_scene.scene_win.close({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
		this.playing_scene.close({
			transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
		});
		this.playing_scene = '';
		menu_win.open();
		loadScrollViewWithPage(Ti.App.Properties.getInt('CurrentUser'));
		//Ti.App.fireEvent('startWin');
		//Titanium.UI.orientation = Titanium.UI.PORTRAIT;

		// menu_win.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});

		// if ( ti_ver > 130 ) {
		// 	Titanium.UI.orientation = Titanium.UI.PORTRAIT;
		// }
		// users.setData(get_users());
		// this.playing_scene.scene_win.empty().close({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	},
	play: function(scene) {
		this.playing_scene = new Scene(scene);
		story.playing_scene.open().play();
	}
};