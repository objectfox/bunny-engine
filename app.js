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


var platform = Ti.Platform.osname;

Titanium.include('js/rborn_ti.js');
Titanium.include('database.js');
Titanium.include('js/functions.js');
Titanium.include('js/animations.js');
Titanium.include('js/scene.js');
Titanium.include('story.js');
Titanium.include('story_data.js');

Titanium.UI.setBackgroundColor('#000');
Titanium.UI.statusBarHidden =  true;

// Titanium.UI.orientation = Ti.UI.LANDSCAPE_LEFT;

// some global variables like navigation buttons, etc, that will exist in any scene

var busy= false ; // a flag to prevent multiple execution
var current_user,editing_user = false, adding_user =  false;
var current_id, current_name , current_hair, current_skin, current_gender, current_spoken;

var globals = {
	go_prev: {
		url:(platform == 'iphone') ? 'images/globals/go_prev.png':"images/globals/go_prev_ipad.png",
		left:0,
		top: 0,
		width:(platform == 'iphone') ? 40 :96,
		height:(platform == 'iphone') ? 320 :768
	},
	go_next: {
		url:(platform == 'iphone') ? 'images/globals/go_next.png' : 'images/globals/go_next_ipad.png',
		left:(platform == 'iphone') ?440 :920,
		top:0,
		width:(platform == 'iphone') ?40 : 96,
		height:(platform == 'iphone') ? 320 :768
	},
	go_home: {
		url:(platform == 'iphone') ? 'images/globals/go_home.png' :"images/globals/go_home_ipad.png",
		left:(platform == 'iphone') ? 20 : 110,
		top:(platform == 'iphone') ? 10 : 10,
		width:(platform == 'iphone') ? 80 : 180,
		height:(platform == 'iphone') ? 40 : 90
	},
	go_pause: {
		url:(platform == 'iphone') ? 'images/globals/go_pause.png' :"images/globals/go_pause_ipad.png",
		left:(platform == 'iphone') ? 350 : 610,
		top:(platform == 'iphone') ? 10 : 10,
		width:(platform == 'iphone') ? 120 : 240,
		height:(platform == 'iphone') ? 40 : 90
	},
	go_play: {
		url:(platform == 'iphone') ? 'images/globals/go_play.png' :"images/globals/go_play_ipad.png",
		left:(platform == 'iphone') ? 350 : 620,
		top:(platform == 'iphone') ? 10 : 10,
		width:(platform == 'iphone') ? 120 : 240,
		height:(platform == 'iphone') ? 40 : 90
	},
	autoplay:true,
	subtitles:false,
	sound:true
};

var story_go = function(dir) {
	// if (dir == 'next') {
	// 	story.play();
	// }
};
var story_start_rewind = function() { ;
};

if(platform == 'iphone') {
	Titanium.include('menu.js');
}
else if(platform == 'ipad'){
	Titanium.include('iPadJS/menu.js');
}

var bgds = ['0f0','f00','00f'];