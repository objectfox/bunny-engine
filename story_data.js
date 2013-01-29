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

var story_branch_scenes= {};

function createGender(current_scene, current_gender,current_skin) {

	this.kid =  new rel('img', {
		url:(platform == 'iphone') ?
		current_gender==null ?
		'images/story/iphoneImages/sc'+ current_scene +'-skin-'+current_skin+'.png' :
		'images/story/iphoneImages/sc'+ current_scene + '-' +  current_gender+'-skin-'+current_skin+'.png'
		:
		current_gender==null ?
		'images/story/ipadImages/sc'+ current_scene +'-skin-'+current_skin+'.png' :
		'images/story/ipadImages/sc' + current_scene +'-'+current_gender+'-skin-'+current_skin+'.png',
		width:(platform == 'iphone') ? 480 : 1024,
		height:(platform == 'iphone') ? 320 : 768,
		top:(platform == 'iphone') ? 0 : 0,
		left:(platform == 'iphone') ? 0 : 0
	});
	return this.kid;

}

function createHair(current_scene, current_gender,current_hair) {

	this.kid_hair =  new rel('img', {
		url:(platform == 'iphone') ?
		//current_gender==null ?
		//'images/story/iphoneImages/sc'+current_scene+'-hair-'+current_hair+'.png' :
		'images/story/iphoneImages/sc'+current_scene+'-'+current_gender+'-hair-'+current_hair+'.png'
		:
		'images/story/ipadImages/sc'+current_scene+'-'+current_gender+'-hair-'+current_hair+'.png' ,

		width:(platform == 'iphone') ? 480 : 1024,
		height:(platform == 'iphone') ? 320 : 768,
		top:(platform == 'iphone') ? 0 : 0,
		left:(platform == 'iphone') ? 0 : 0
	});

	return this.kid_hair;
}

story_main_scenes = [
{
	bg_image:(platform == 'iphone') ? 'images/story/iphoneImages/sc1.jpg' : "images/story/ipadImages/sc1.jpg",
	bg_width:(platform == 'iphone') ? 480:1024,
	bg_height:(platform == 'iphone') ? 320 : 768,

	init: function() {

	},
	lines:[{
		sound:'sounds/1.m4a',
		text: 'Welcome to BunnyEngine',
		start: function() {
			// story.playing_scene.bgd.animate( move_to(0,(platform == 'iphone')?-640:-740,2500 ));
			// story.playing_scene.sock.move_to((platform == 'iphone') ? 100 :280,(platform == 'iphone') ? 150 :560,2500);
		},
		end:$empty
	}]
},{
	bg_image:(platform == 'iphone') ? 'images/story/iphoneImages/sc2-bg.jpg' : "images/story/ipadImages/sc2-bg.jpg",
	bg_width:(platform == 'iphone') ? 664 : 1536,
	bg_height:(platform == 'iphone') ? 320 : 768,
	init: function() {
		this.kid =  new rel('img', {
			//url:(platform == 'iphone') ? current_gender==null ? 'images/story/iphone/sc'+ + -skin-'+current_skin+'.png'
			url:(platform == 'iphone') ? 'images/story/iphoneImages/sc2-'+current_gender+'-'+current_skin+'-'+current_hair+'.png' : 'images/story/ipadImages/sc2-'+current_gender+'-'+current_skin+'-'+current_hair+'.png' ,
			width:(platform == 'iphone') ? 664 : 1536,
			height:(platform == 'iphone') ? 320 : 768,
			top:(platform == 'iphone') ? 0 : 0,
			left:(platform == 'iphone') ? 0 : 0
		});
		this.add_object(this.kid);
	},
	lines:[{
		sound:'sounds/2.m4a',
		text:'This is a scene that pans.',
		start: function() {
			var wdth = (platform == 'iphone') ? -184 : -512;
			var x = (platform == 'iphone') ? 0 : 0;
			var y = (platform == 'iphone') ? 0 : 0;

			story.playing_scene.bgd.animate( move_to(wdth,0,3500 ));
			story.playing_scene.kid.animate( move_to(wdth,0,3500 ));
			//story.playing_scene.kid_hair.move_to(x,y,1500);

			var tm = mySetTimeout( function() {
				//this is ugly, because clearTimeout does not work as supposed we need to verify the object exists
				//this leads to another issue, we cannot have 2 subsquent scenes with the same name for objects
				//so scene1.kid, scene2.kid is not good, we need to differentiate this
				// corrrect should be scene1.kid_1, scene2.kid_2

				// still searching for a fix
				//if ( story.playing_scene.kid ) story.playing_scene.kid.spin_v(2,1,1000);
			}, 200);
			story.timeouts.push(tm);// we need to register the timeout for futher cleaning
		},
		end:$empty

	}
	]
},{
	bg_image:(platform == 'iphone') ? 'images/story/iphoneImages/sc3-bg.jpg' : "images/story/ipadImages/sc3-bg.jpg",
	bg_width:(platform == 'iphone') ? 480 : 1024,
	bg_height:(platform == 'iphone') ? 320 : 768,

	init: function() {

		this.add_object(createGender(3, current_gender,current_skin));
		this.add_object(createHair(3, current_gender,current_hair));

	},
	lines:[{
		sound:'sounds/3.m4a',
		text:'This is a scene that doesn\'t pan.',
		start: function() {
			// story.playing_scene.bgd.animate( move_to(0,(platform == 'iphone')?-640:-740,2500 ));
			// story.playing_scene.sock.move_to((platform == 'iphone') ? 100 :280,(platform == 'iphone') ? 150 :560,2500);
		},
		end:$empty
	}
	]
}

// Here's how you would do a scene with a spoken name.  The first text is with the name, the second without.
// The file name if you have no name would be 13-no_name.m4a, otherwise 13-Abagail.m4a, for instance.
// 
// ,{
// 	bg_image:(platform == 'iphone') ? 'images/story/iphoneImages/sc13-bg.jpg' : "images/story/ipadImages/sc13-bg.jpg",
// 	bg_width:(platform == 'iphone') ? 480 : 1024,
// 	bg_height:(platform == 'iphone') ? 320 : 768,
// 
// 	init: function() {
// 
// 		this.add_object(createGender(13, current_gender,current_skin));
// 		this.add_object(createHair(13, current_gender,current_hair));
// 
// 	},
// 	lines:[{
// 		sound:'sounds/13_#current_spoken.m4a',
// 		text:['One of them bowed and said, "Welcome, #current_name.  I\'m Fizzy."','One of them bowed and said, "Welcome.  I\'m Fizzy."'],
// 		start: function() {
// 		},
// 		end:$empty
// 	}	]
// }



];