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


// This is a sample of how the story could support branched scenes, 
// aka a Choose Your Own Adventure type story.  This code isn't fully
// fleshed out, but should be a good starting point.

var story_branch_scenes={};


story_main_scenes = [

{
	bg_image:'images/story/scene_1_bg.jpg',
	bg_width:960,
	bg_height:320,
	init: function(){ 
		
		this.kid =  new rel('img',{
			url:'images/story/scene_1_kid.png',
			width:163,
			height:258,
			top:52,
			left:650
			});

		this.add_object(this.kid);
		
	},
	branches:['duck', 'mouse'],
	lines:[
		{
			sound:['sounds/a.mp3','sounds/b.mp3','sounds/1.0.mp4'], 
			text:'The day I met the secret agent bunnies I just lost sock number 3.',
			start:function(){
				story.playing_scene.bgd.animate( move_to(-480,0,1500 ));	
				story.playing_scene.kid.move_to(160,52,1500);
				
				// var tm = mySetTimeout( function() { 
				// 		// this is ugly, because clearTimeout does not work as supposed we need to verify the object exists
				// 		// this leads to another issue, we cannot have 2 subsquent scenes with the same name for objects
				// 		// so scene1.kid, scene2.kid is not good, we need to differentiate this
				// 		// corrrect should be scene1.kid_1, scene2.kid_2
				// 	
				// 		// still searching for a fix
				// 		if ( story.playing_scene.kid ) story.playing_scene.kid.spin_v(2,1,1000);
				// 	}, 2000); 

				var tm = setTimeout( function() {
					if ( story.playing_scene.kid ) { story.playing_scene.kid.spin_v(2,1,1000); }
					}, 2000);
					
				story.timeouts.push(tm);// we need to register the timeout for futher cleaning
			},
			end:$empty

		},
		{
			sound:'sounds/2.0.mp4', 
			text:'Then I saw it, almost under the bad. When I reached for it, it disappeard.',
			start:$empty,
			end:function(){log("End 2nd line");}
		}
		//,
		// {	
		// 	sound:'sounds/3.0.mp4', 
		// 	text:'I grabed the sock with both hands but then, something grabed it back.',
		// 	start:$empty,
		// 	end:function() { 
		// 		story.playing_scene.kid.set('url','images/story/scene_1_kid_smile.png');
		// 	}
		// }
	]
},

{
	bg_image:'images/story/scene_2_bed.jpg',
	bg_width:480,
	bg_height:960,
	init: function(){
		this.sock = new rel('img',{
			url:'images/story/scene_2_sock.png',
			width:92,
			height:72,
			top:790,
			left:100
			});
		this.add_object(this.sock);
	},
	lines:[
		{
			sound:'sounds/3.0.mp4', 
			text:'bla1',
			start:function(){
				story.playing_scene.bgd.animate( move_to(0,-640,2500 ));	
				story.playing_scene.sock.move_to(100,150,2500);
			},
			end:$empty
		}
	]
}

];



story_branch_scenes.duck = {
	button:{
		url:'images/story/duck.png',
		top:10,
		left:10,
		height:100,
		width:100
	},
	scenes:[
		{
			bg_image:'images/story/scene_2_bed.jpg',
			bg_width:480,
			bg_height:960,
			init: $empty,
			lines:[
				{
					sound:'sounds/duck.wav', 
					text:'duck',
					start:$empty,
					end:$empty
				}
			]
		}
	],
	follow_scene: {
		scene_arr:story_main_scenes,
		id:1
	}	
};



story_branch_scenes.mouse = {
	button:{
		url:'images/story/mouse.png',
		bottom:10,
		right:10,
		height:100,
		width:100
	},
	scenes:[
		{
			bg_image:'images/story/scene_2_bed.jpg',
			bg_width:480,
			bg_height:960,
			init: $empty,
			lines:[
				{
					sound:'sounds/mouse.wav', 
					text:'mouse 1',
					start:$empty,
					end:$empty
				}
			]
		},
		{
			bg_image:'images/story/scene_2_bed.jpg',
			bg_width:480,
			bg_height:960,
			init: $empty,
			lines:[
				{
					sound:'sounds/mouse.wav', 
					text:'mouse 2.1',
					start:$empty,
					end:$empty
				},
				{
					sound:'sounds/mouse.wav', 
					text:'mouse 2.2',
					start:$empty,
					end:$empty
				},
				{
					sound:'sounds/mouse.wav', 
					text:'mouse 2.3',
					start:$empty,
					end:function(){ alert('end mice l3');}
				}
			]
		}
	],
	follow_scene: {
		scene_arr:story_main_scenes,
		id:1
	}	
}



;