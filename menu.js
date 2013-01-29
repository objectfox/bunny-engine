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


editprofiles = false;
var arrData = [];
var viewControllers = [];
adding_user = true;
var addProfile_view;
var mainView;
var profiles_view;
var inner_view;
var control_view_v;
var control_view_h;

var menu_win = new rel('window');

menu_win.open();

var bgPlayer = Ti.Media.createSound({url:"music/silence.m4a", volume: 0.1, looping: true});
bgPlayer.play();

//addProfile();
var genderSkin;
var genderHair;
var cancel = new rel('button', {
	top : 10,
	left : 10,
	height : 40,
	width : 123,
	backgroundImage : "images/globals/backbutton.png"
}, {
	click : function(e) {
		adding_user = true;
		editing_user = false;

		var anim = new ranim({
			view : inner_view,
			transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
		}, {
			complete : function() {

			}
		});

		menu_win.animate(anim);
		inner_view.el.backgroundImage = "images/globals/editprofile.png";
		mainView.profView.show();
		mainView.editProfView.hide();
		// inner_view.el.backgroundImage = 'images/globals/editprofiles_bg.png';
		//inner_view;
		control_view_v.show();
		control_view_h.show();
		inner_view.remove(cancel);
		// cancel.inject(inner_view);
		right_edit_v.hide();
		left_edit_v.hide();
		change_size(false);
		setEditCancelOnViewControlls();

	}
});

getProfileViews("onload");
//addProfile()
function addProfile() {
	Ti.API.info('From  ---  AddProfile View ');
	addProfile_view = new rel('window', {
		width : 480,
		top : 0,
		height : 320,
		backgroundImage : "images/globals/addprofiles_bg.png",
		zIndex : 1
	});
	var add_button = new rel('button', {
		backgroundImage : "images/globals/addbutton.png",
		top : 80,
		height : 140,
		width : 157,
		left : 34,
		zIndex : 1
	}, {
		click : function(e) {
			adding_user = true;
			var anim = new ranim({
				view : addProfile_view,
				transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			}, {
				complete : function() {

				}
			});
			createProfile();
		}
	}).inject(addProfile_view);

	var web_view = new rel('label', {
		backgroundColor : 'transparent',
		bottom : 5,
		right : 10,
		height : 15,
		width : 130
	}, {
		click : function(e) {
			Titanium.Platform.openURL("http://www.bunnyagents.com/");
		}
	}).inject(addProfile_view);

	addProfile_view.open();
}

/// Custom event for character...

Ti.App.addEventListener('SetCharacter', function(e) {
	genderSkin.el.image = "images/globals/profile-" + current_gender + "-skin-" + current_skin + ".png";
	genderHair.el.image = "images/globals/profile-" + current_gender + "-hair-" + current_hair + ".png";
});
/// Create window for Create Profile...
function createProfile(user) {

	if(user == null || user == undefined || add_user == true) {
		current_gender = 'boy';
		current_hair = 'black';
		current_skin = 'black';
	} else {
		current_id = user.id;
		current_gender = user.gender;
		current_hair = user.hair;
		current_skin = user.skin;
	}
	var createProfile_win = new rel('window', {
		backgroundImage : "images/globals/new_profile.jpg",
		width : 480,
		top : 0,
		height : 320
	});

	var hair_arr = [];

	hair_arr.push(new rel('view', {
		left : 88,
		top : 195,
		width : 40,
		height : 40,
		backgroundColor : "black",
		borderRadius : 5,
		borderColor : '#f00',
		borderWidth : 3,
		hair_color : 'black'
	}, {
		click : function(e) {

			for(l in hair_arr ) {
				hair_arr[l].set('borderWidth', 1);
				hair_arr[l].set('borderColor', '#fff');
			}

			e.source.borderWidth = 3;
			e.source.borderColor = '#f00';
			current_hair = 'black';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win));

	hair_arr.push(new rel('view', {
		left : 140,
		top : 195,
		width : 40,
		height : 40,
		backgroundColor : "#463324",
		borderRadius : 5,
		borderColor : '#fff',
		borderWidth : 1,
		hair_color : 'brown'
	}, {
		click : function(e) {

			for(l in hair_arr ) {
				hair_arr[l].set('borderWidth', 1);
				hair_arr[l].set('borderColor', '#fff');
			}
			e.source.borderWidth = 3;
			e.source.borderColor = '#f00';
			current_hair = 'brown';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win));

	hair_arr.push(new rel('view', {
		left : 192,
		top : 195,
		width : 40,
		height : 40,
		backgroundColor : "#ecbf0c",
		borderRadius : 5,
		borderColor : '#fff',
		borderWidth : 1,
		hair_color : 'yellow'
	}, {
		click : function(e) {

			for(l in hair_arr ) {
				hair_arr[l].set('borderWidth', 1);
				hair_arr[l].set('borderColor', '#fff');
			}

			e.source.borderWidth = 3;
			e.source.borderColor = '#f00';
			current_hair = 'yellow';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win));

	hair_arr.push(new rel('view', {
		left : 244,
		top : 195,
		width : 40,
		height : 40,
		backgroundColor : "#ff6d0d",
		borderRadius : 5,
		borderColor : '#fff',
		borderWidth : 1,
		hair_color : 'red'
	}, {
		click : function(e) {

			for(l in hair_arr ) {
				hair_arr[l].set('borderWidth', 1);
				hair_arr[l].set('borderColor', '#fff');
			}

			e.source.borderWidth = 3;
			e.source.borderColor = '#f00';
			current_hair = 'red';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win));
	var skin_arr = [];
	skin_arr.push(new rel('view', {
		left : 88,
		top : 255,
		width : 40,
		height : 40,
		backgroundColor : "#6d523f",
		borderRadius : 5,
		borderColor : '#f00',
		borderWidth : 3,
		skin_color : 'black'
	}, {
		click : function(e) {

			for(l in skin_arr ) {
				skin_arr[l].set('borderWidth', 1);
				skin_arr[l].set('borderColor', '#fff');
			}

			e.source.borderWidth = 3;
			e.source.borderColor = '#f00';
			current_skin = 'black';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win));

	skin_arr.push(new rel('view', {
		left : 140,
		top : 255,
		width : 40,
		height : 40,
		borderRadius : 5,
		backgroundColor : "#c09f80",
		borderColor : '#fff',
		borderWidth : 1,
		skin_color : 'brown'
	}, {
		click : function(e) {
			for(l in skin_arr ) {
				skin_arr[l].set('borderWidth', 1);
				skin_arr[l].set('borderColor', '#fff');
			}

			e.source.borderWidth = 3;
			e.source.borderColor = '#f00';
			current_skin = 'brown';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win));

	skin_arr.push(new rel('view', {
		left : 192,
		top : 255,
		width : 40,
		height : 40,
		backgroundColor : "#fccbbc",
		borderRadius : 5,
		borderColor : '#fff',
		borderWidth : 1,
		skin_color : 'white'
	}, {
		click : function(e) {

			for(l in skin_arr ) {
				skin_arr[l].set('borderWidth', 1);
				skin_arr[l].set('borderColor', '#fff');
			}

			e.source.borderWidth = 3;
			e.source.borderColor = '#f00';
			current_skin = 'white';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win));
	genderSkin = new rel('img', {
		image : 'images/globals/profile-boy-skin-black.png',
		top : 94,
		left : 335,
		width : 113,
		height : 109
	}).inject(createProfile_win);
	genderHair = new rel('img', {
		image : 'images/globals/profile-boy-hair-brown.png',
		top : 94,
		left : 335,
		width : 113,
		height : 109
	}).inject(createProfile_win);

	var gender_arr = [];
	var gender = new rel('img', {
		bottom : 68,
		width : 108,
		height : 36,
		left : 332,
		image : "images/globals/genderboy.png"
	}).inject(createProfile_win);

	gender_arr.push(new rel('view', {
		backgroundColor : 'transparent',
		bottom : 68,
		width : 54,
		height : 36,
		left : 387,
		border:0
	}, {
		click : function(e) {
			gender.el.image = "images/globals/gendergirl.png";
			current_gender = "girl";
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win));

	gender_arr.push(new rel('view', {
		backgroundColor : 'transparent',
		bottom : 68,
		width : 54,
		height : 36,
		left : 333,
		border:0
	}, {
		click : function(e) {
			gender.el.image = "images/globals/genderboy.png";
			current_gender = "boy";
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win));

	// gender_arr.push( new rel('view', {
	// backgroundColor:'transparent',
	// bottom:68,
	// width:54,
	// height:35,
	// left:332,
	// borderRadius:5,
	// borderColor:'#f00',
	// borderWidth:3
	// }	, {
	// click: function(e) {
	//
	// for ( l in gender_arr ) {
	// gender_arr[l].set('borderWidth',1);
	// gender_arr[l].set('borderColor','#fff');
	// }
	//
	// e.source.borderWidth = 3;
	// e.source.borderColor = '#f00';
	//
	// current_gender = "boy";
	// Ti.App.fireEvent("SetCharacter");
	//
	// }
	// }).inject(createProfile_win) );
	//
	// gender_arr.push( new rel('view', {
	// backgroundColor:'transparent',
	// bottom:68,
	// width:54,
	// height:35,
	// left:396,
	// borderRadius:5,
	// borderColor:'blue',
	// borderWidth:0
	// }	, {
	// click: function(e) {
	//
	// for ( l in gender_arr ) {
	// gender_arr[l].set('borderWidth',1);
	// gender_arr[l].set('borderColor','#fff');
	// }
	//
	// e.source.borderWidth = 3;
	// e.source.borderColor = '#f00';
	// current_gender = "girl";
	// //alert("OK");
	// Ti.App.fireEvent("SetCharacter");
	//
	// }
	// }).inject(createProfile_win) );

	if(user != null || user != undefined) {
		switch(user.skin) {
			case "black": {
				skin_arr[0].el.fireEvent('click');
				break;
			}
			case "brown": {
				skin_arr[1].el.fireEvent('click');
				break;
			}
			case "white": {
				skin_arr[2].el.fireEvent('click');
				break;
			}
		}
		switch(user.hair) {
			case "black": {
				hair_arr[0].el.fireEvent('click');
				break;
			}
			case "brown": {
				hair_arr[1].el.fireEvent('click');
				break;
			}
			case "yellow": {
				hair_arr[2].el.fireEvent('click');
				break;
			}
			case "red": {
				hair_arr[3].el.fireEvent('click');
				break;
			}
		}
		switch(user.gender) {
			case "boy": {
				gender_arr[1].el.fireEvent('click');
				break;
			}
			case "girl": {
				gender_arr[0].el.fireEvent('click');
				break;
			}
		}
	}

	// new rel('label', {
	// text:"Hair:",
	// top:160,
	// left:10,
	// width:300,
	// height:24,
	// font: {
	// fontSize:16,
	// fontWeight:'bold'
	// },
	// textAlign:'left',
	// color:'#fff'
	//
	// }).inject(createProfile_win);

	var name_input = new rel('input', {
		top : 80,
		left : 93,
		backgroundColor : '#fff',
		width : 220,
		height : 35,
		hintText : "Name",
		autocorrect : false,
		returnKeyType : Titanium.UI.RETURNKEY_DONE,
		borderRadius:5,
		font: {
			fontSize:22,
			fontFamily:'Marker Felt',
			fontWeight:'bold'
		},
		autoCapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
	}, {
		focus : function(e) {
			log('Focus event');
		},
		blur : function(e) {
			log('blur event');
		}
	}).inject(createProfile_win);

	var picker_view = new rel('view', {
		left : 0,
		width : 480,
		height : 200,
		bottom : -251,
		zIndex : 22,
		borderRadius : 5
	}).inject(createProfile_win);

	var picker = new rel('picker', {
		top : 43,
		rows_data : [Titanium.UI.createPickerRow({
			title : 'Not Listed'
		}), Titanium.UI.createPickerRow({
			title : 'Aaron'
		}), Titanium.UI.createPickerRow({
			title : 'Abigail'
		}), Titanium.UI.createPickerRow({
			title : 'Abraham'
		}), Titanium.UI.createPickerRow({
			title : 'Zoey'
		})//,
		// Titanium.UI.createPickerRow({
		// title:'James'
		// })
		]
	}).inject(picker_view);
	picker.set('selectionIndicator', true);

	var save = new rel('button', {
		title : 'Done',
		style : Titanium.UI.iPhone.SystemButtonStyle.DONE
	}, {
		click : function() {
			spoken_input.set('value', picker.getSelectedRow(0).title);
			picker_view.animate(picker_slide_out);
		}
	});

	var cancelPicker = new rel('button', {
		title : 'Cancel',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	}, {
		click : function() {
			picker_view.animate(picker_slide_out);
		}
	});
	var spacer = new rel('flex_space');

	var toolbar = new rel('toolbar', {
		top : 12,
		height : 47
	}).set('items', [save, spacer, cancelPicker]).inject(picker_view);

	var spoken_input = new rel('input', {
		top : 140,
		left : 93,
		backgroundColor : '#fff',
		width : 170,
		height : 32,
		hintText : "Pronounced Like",
		borderColor : 'white',
		editable : false,
		enabled : false,
		borderRadius:5,
		font: {
			fontSize:22,
			fontFamily:'Marker Felt',
			fontWeight:'bold'
		},
		// style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	}, {
		click : function(e) {
			//name_input.el.fireEvent('return');
			picker_view.animate(picker_slide_in);

		}
	}).inject(createProfile_win);

	var cancel = new rel('button', {
		top : 10,
		left : 10,
		height : 40,
		width : 123,
		backgroundImage : "images/globals/cancelbutton.png"
	}, {
		click : function(e) {
			slide_it_up = Titanium.UI.createAnimation();
			slide_it_up.top = 320;
			// to put it back to the left side of the window
			slide_it_up.duration = 500;
			createProfile_win.el.close(slide_it_up);
			//profile_view.show();
		}
	}).inject(createProfile_win);

	var saveButton = new rel('button', {
		bottom : 17,
		left : 357,
		height : 40,
		width : 84,
		backgroundImage : "images/globals/savebutton.png"
	}, {
		click : function() {
			// Ti.API.info('Clicked');
			saveButton.el.enabled = false;
			if(name_input.get('value') && spoken_input.get('value') && current_hair && current_skin && current_gender) {
				if(adding_user == true) {
					var user_data = {
						name : name_input.get('value'),
						spoken : spoken_input.get('value'),
						hair : current_hair,
						skin : current_skin,
						gender : current_gender
					};
				} else {
					var user_data = {
						id : current_id,
						name : name_input.get('value'),
						spoken : spoken_input.get('value'),
						hair : current_hair,
						skin : current_skin,
						gender : current_gender
					};
				}
						var msg = "";
						if(adding_user) {

							add_user(user_data);
							msg = "save";

							if(get_profiles().length == 1) {
								addProfile_view.close();
							}
							user_data.profile_number = get_profiles().length;

						} else {
							// Ti.API.info('---------  Testing Area SAVE BEGIN : ' + current_id);
							// Ti.API.info('---------  Testing Area : ' + JSON.stringify(user_data));
							save_user(current_id, user_data);
							msg = "edit";
							user_data.profile_number = current_id;
						}



							user_data.platform = Titanium.Platform.name;
							user_data.ios_version = Titanium.Platform.version;
							user_data.app_version = Titanium.App.version;
							user_data.guid = Titanium.App.guid;
							user_data.device_id = get_my_uuid();
							user_data.app_id = Titanium.App.id;
							user_data.model = Titanium.Platform.model;
							user_data.add_or_edit = msg;

						getProfileViews(msg);
						slide_it_up = Titanium.UI.createAnimation();
						slide_it_up.top = 320;
						// to put it back to the left side of the window
						slide_it_up.duration = 500;
						createProfile_win.el.close(slide_it_up);
						addProfile_view.close();					
						
					//log(file_obj);
					saveButton.el.enabled = true;
				//}, function(val) {

				//	log(val);
				//});
			} else {
				alert('Please set all data');
				saveButton.el.enabled = true;
			}
			
		}
	}).inject(createProfile_win);

	if(add_user != true && user != null && user != undefined) {
		for(l in skin_arr ) {
			skin_arr[l].set('borderWidth', 1);
			skin_arr[l].set('borderColor', '#fff');
		}
		spoken_input.set('value', user.spoken.toString());
		for(l in hair_arr ) {
			hair_arr[l].set('borderWidth', 1);
			hair_arr[l].set('borderColor', '#fff');
		}
		name_input.set('value', user.name.toString());
		// for(l in gender_arr ) {
			// gender_arr[l].set('borderWidth', 1);
			// gender_arr[l].set('borderColor', '#fff');
		// }
	}

	var detail_view = new rel('label', {
		backgroundColor : 'transparent',
		top : 125,
		left : 270,
		height : 45,
		width : 45
	}, {
		click : function(e) {
			var web_view;
			var modal_window = new rel('window', {
				backgroundImage : 'images/globals/editprofiles_bg.png',
				title : "Names",
				top : 0,
				left : 0,
				height : 320,
				width : 480
			});

			var names_detail = new rel('label', {
				backgroundColor : 'transparent',
				top : 75,
				left : 20,
				height : 130,
				font : {
					fontSize : 16
				},
				width : 450,
				text : 'Dust Bunnies is a revolutionary storybook app, and this is the open source engine version.'
			}).inject(modal_window);

			modal_window.open({
				modal : true
			});

			var detail_view = new rel('label', {
				backgroundColor : 'transparent',
				top : 181,
				left : 117,
				height : 20,
				font : {
					fontSize : 16
				},
				color : 'blue',
				width : 300,
				text : "http://www.bunnyagents.com/"
			}, {
				click : function(e) {
					web_view = new rel('webview', {
						top : 60,
						left : 8,
						height : 255,
						width : 460,
						url : 'http://www.bunnyagents.com/',
						scalesPageToFit : false
					}).inject(modal_window);
				}
			}).inject(modal_window);

			var close_button = new rel('button', {
				top : 10,
				left : 10,
				height : 40,
				width : 123,
				backgroundImage : "images/globals/closebutton.png"
			}, {
				click : function(e) {
					if(web_view) {
						modal_window.remove(web_view);
					}
					modal_window.close();
				}
			}).inject(modal_window);
			modal_window.hideNavBar();

		}
	}).inject(createProfile_win);
	slide_it_up = Titanium.UI.createAnimation();
	slide_it_up.top = 0;
	// to put it back to the left side of the window
	slide_it_up.duration = 500;
	createProfile_win.el.open(slide_it_up);

	Ti.App.fireEvent("SetCharacter");
}

/// Creating Scrollable view for all Profiles...

function getProfileViews(from) {
	var currPage;
	arrData = get_profiles();

	if(profiles_view == null || profiles_view == undefined) {
		inner_view = new rel('view', {
			top : 0,
			left : 0,
			width : 480,
			height : 320,
			backgroundImage : "images/globals/editprofile.png"

		}, {
			scroll : function(e) {
				// current_user = arrData[e.currentPage].id;
				// var mainView = viewControllers[e.currentPage];
				// loadScrollViewWithPage(e.currentPage);
			}
		}).inject(menu_win);
		profiles_view = new rel('ScrollableView', {
			showPagingControl : false,
			top : 70,
			left : 25,
			width : 355,
			height : 215,
			contentWidth : 'auto',
			clipViews : false
		}, {
			scroll : function(e) {
				current_user = arrData[e.currentPage].id;
				var mainView = viewControllers[e.currentPage];
				loadScrollViewWithPage(e.currentPage);
			}
		}).inject(inner_view);
		control_view_h = new rel('view', {
			bottom : 0,
			left : 0,
			width : 480,
			height : 25,
			zindex : 2
		}).inject(inner_view);
		left_view_v = new rel('view', {
			top : 0,
			left : 0,
			width : 9,
			height : 320,
			//backgroundColor:"red"
			backgroundImage : "images/globals/v_imageleft.png"
		}).inject(inner_view);
		left_edit_v = new rel('view', {
			top : 0,
			left : 0,
			width : 9,
			height : 320,
			backgroundImage : "images/globals/v_imageleft-e.png"
		}).inject(inner_view);
		right_edit_v = new rel('view', {
			top : 0,
			right : 0,
			width : 14,
			height : 320,
			backgroundImage : "images/globals/v_imageright-e.png"
		}).inject(inner_view);
		right_edit_v.hide();
		left_edit_v.hide();
		control_view_v = new rel('view', {
			top : 45,
			right : 0,
			width : 92,
			height : 253,
			backgroundImage : "images/globals/v_image.png"
		}).inject(inner_view);
		var add_button = new rel('button', {
			backgroundImage : "images/globals/adduserbutton.png",
			bottom : 23,
			height : 55,
			width : 60,
			right : 15
		}, {
			click : function(e) {
				adding_user = true;
				editing_user = false;
				createProfile();
			}
		}).inject(control_view_v);

		var sound_button = new rel('img', {
			image : "images/globals/onbutton.png",
			top : 130,
			height : 30,
			width : 70,
			left : 10//,
			//zIndex:1
		}, {
			click : function(e) {

			}
		}).inject(control_view_v);

		var sound_arr = [];
		/// Off button
		sound_arr.push(new rel('view', {
			backgroundColor : 'transparent',
			top : 130,
			width : 38,
			height : 30,
			right : 12,
			// borderRadius:5,
			// borderColor : '#f00', //globals.subtitles == false ? '#f00' : '#fff',
			// borderWidth : 3,//globals.subtitles == false ? 3 : 0,
		}, {
			click : function(e) {

				// for ( l in subtitles_arr ) {
				// subtitles_arr[l].set('borderWidth',1);
				// subtitles_arr[l].set('borderColor','#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				// globals.subtitles = false;
				sound_button.el.image = "images/globals/offbutton.png";
				globals.sound = false;
				bgPlayer.volume = 0.0;
			}
		}).inject(control_view_v));
		/// On button
		sound_arr.push(new rel('view', {
			backgroundColor : 'transparent',
			top : 130,
			width : 30,
			height : 30,
			right : 52,
			// borderRadius:5,
			// borderColor: '#fff',//(globals.subtitles==true) ? '#f00' : '#fff',
			// borderWidth: 1 //(globals.subtitles==true) ? 3 : 0,
			//zindex:2
		}, {
			click : function(e) {

				// for ( l in subtitles_arr ) {
				// subtitles_arr[l].set('borderWidth',1);
				// subtitles_arr[l].set('borderColor','#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				// globals.subtitles = true;
				sound_button.el.image = "images/globals/onbutton.png";
				globals.sound = true;
				bgPlayer.volume = 0.1;
			}
		}).inject(control_view_v));
		
		var subtitles_button = new rel('img', {
			image : "images/globals/offbutton.png",
			top : 22,
			height : 30,
			width : 70,
			left : 10//,
			//zIndex:1
		}, {
			click : function(e) {

			}
		}).inject(control_view_v);


		var subtitles_arr = [];
		/// Off button
		subtitles_arr.push(new rel('view', {
			backgroundColor : 'transparent',
			top : 22,
			width : 38,
			height : 30,
			right : 12,
			// borderRadius:5,
			// borderColor : '#f00', //globals.subtitles == false ? '#f00' : '#fff',
			// borderWidth : 3,//globals.subtitles == false ? 3 : 0,
		}, {
			click : function(e) {

				// for ( l in subtitles_arr ) {
				// subtitles_arr[l].set('borderWidth',1);
				// subtitles_arr[l].set('borderColor','#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				// globals.subtitles = false;
				subtitles_button.el.image = "images/globals/offbutton.png";
				globals.subtitles = false;
			}
		}).inject(control_view_v));
		/// On button
		subtitles_arr.push(new rel('view', {
			backgroundColor : 'transparent',
			top : 22,
			width : 30,
			height : 30,
			right : 52,
			// borderRadius:5,
			// borderColor: '#fff',//(globals.subtitles==true) ? '#f00' : '#fff',
			// borderWidth: 1 //(globals.subtitles==true) ? 3 : 0,
			//zindex:2
		}, {
			click : function(e) {

				// for ( l in subtitles_arr ) {
				// subtitles_arr[l].set('borderWidth',1);
				// subtitles_arr[l].set('borderColor','#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				// globals.subtitles = true;
				subtitles_button.el.image = "images/globals/onbutton.png";
				globals.subtitles = true;
			}
		}).inject(control_view_v));

		var autoplay_button = new rel('img', {
			image : "images/globals/onbutton.png",
			top : 77,
			height : 30,
			width : 70,
			left : 10//,
			//zIndex:1
		}, {
			click : function(e) {

			}
		}).inject(control_view_v);

		var autoplay_arr = [];
		// Off button
		autoplay_arr.push(new rel('view', {
			backgroundColor : 'transparent',
			top : 77,
			width : 38,
			height : 30,
			right : 12,
			// borderRadius : 5,
			// borderColor : '#fff', //(globals.subtitles == false) ? '#f00' : '#fff',
			// borderWidth : 1 //(globals.subtitles == false) ? 3 : 0,
			//zindex:2
		}, {
			click : function(e) {

				// for ( l in subtitles_arr ) {
				// autoplay_arr[l].set('borderWidth', 1);
				// autoplay_arr[l].set('borderColor', '#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				// globals.autoplay = false;
				autoplay_button.el.image = "images/globals/offbutton.png";
				globals.autoplay = false;
			}
		}).inject(control_view_v));
		/// On button
		autoplay_arr.push(new rel('view', {
			backgroundColor : 'transparent',
			top : 77,
			width : 30,
			height : 30,
			right : 52,
			// borderRadius:5,
			// borderColor:'#f00', //(globals.subtitles==true) ? '#f00' : '#fff',
			// borderWidth:1 //(globals.subtitles==true) ? 3 : 0,
			//zindex:2
		}, {
			click : function(e) {

				// for ( l in subtitles_arr ) {
				// autoplay_arr[l].set('borderWidth',1);
				// autoplay_arr[l].set('borderColor','#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				// globals.autoplay = true;
				autoplay_button.el.image = "images/globals/onbutton.png";
				globals.autoplay = true;
			}
		}).inject(control_view_v));
		
		
		
		var editprofiles_button = new rel('button', {
			backgroundImage : "images/globals/editprofilesbutton.png",
			top : 1,
			height : 19,
			width : 87,
			left : 10
		}, {
			click : function(e) {
				// current_user = user.id.toString();
				// Ti.API.info("Current User - " + current_user);

				adding_user = false;

				var anim = new ranim({
					view : inner_view,
					transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
				}, {
					complete : function() {
						//menu_win.remove(inner_view);
						//inner_view.opacity = 0.2
					}
				});

				menu_win.animate(anim);
				//inner_view.backgroundImage = "images/globals/editprofiles_bg.png";
				//inner_view.bacgrounndColor= 'red'

				inner_view.el.backgroundImage = 'images/globals/editprofiles_bg.png';
				//inner_view;
				control_view_v.hide();
				control_view_h.hide();
				cancel.inject(inner_view);
				right_edit_v.show();
				left_edit_v.show();
				change_size(true);
				//mainView.profView.hide();
				//mainView.editProfView.show();
				//
				setEditCancelOnViewControlls();

			}
		}).inject(control_view_h);

		var web_view = new rel('label', {
			backgroundColor : 'transparent',
			top : 1,
			right : 10,
			height : 15,
			width : 130
		}, {
			click : function(e) {
				Titanium.Platform.openURL("http://www.bunnyagents.com/");
			}
		}).inject(control_view_h);

	}

	if(arrData != null && arrData.length > 0) {
		currPage = profiles_view.el.currentPage;
		var i = 0;
		viewControllers = [];

		for(var i = 0; i < arrData.length / 2; i++) {

			var blankView = new rel('view');
			blankView.isNull = true;

			viewControllers[i] = blankView;
		}
		profiles_view.set('view', viewControllers);
		if(from == 'save') {
			profiles_view.el.currentPage = viewControllers.length - 1;

		} else if(from == 'delete' || from == 'edit') {
			if(currPage >= viewControllers.length) {
				currPage = viewControllers.length - 1;
			}
			profiles_view.el.currentPage = currPage;
		} else {
			profiles_view.el.currentPage = 0;
		}
		loadScrollViewWithPage(profiles_view.el.currentPage);
	} else {
		if(profiles_view != null && profiles_view != undefined) {
			inner_view.remove(profiles_view);
			profiles_view = null;
		}
		addProfile();
	}
}

function loadScrollViewWithPage(page) {
	//Ti.API.info("loadScrollViewWithPage >>> "+page);
	if(page < 0 || page >= arrData.length)
		return;

	if(page != 0) {
		var controller = viewControllers[page - 1];
		var origView;
		if(controller.isNull) {
			var objBean = [];
			objBean.push(arrData[((page - 1) * 2)]);
			if((((page - 1) * 2) + 1) <= arrData.length)
				objBean.push(arrData[((page - 1) * 2) + 1]);
			origView = addProfileMainView(objBean);

			origView.parentView = profiles_view;

			viewControllers[page - 1] = origView;
		}
	}

	var controller = viewControllers[page];
	var origView;
	//var origViewNext
	if(controller.isNull) {
		var objBean = [];
		objBean.push(arrData[(page * 2)]);
		if(((page * 2) + 1) <= arrData.length)
			objBean.push(arrData[(page * 2) + 1]);
		origView = addProfileMainView(objBean);
		origView.parentView = profiles_view;
		viewControllers[page] = origView;
	}

	if(page != (arrData.length / 2) - 1) {
		var controller = viewControllers[page + 1];
		var origView;
		if(controller != undefined && controller.isNull) {
			var objBean = [];
			objBean.push(arrData[((page + 1) * 2)]);
			if(((page + 1) * 2) + 1 <= arrData.length)
				objBean.push(arrData[((page + 1) * 2) + 1]);
			origView = addProfileMainView(objBean);

			origView.parentView = profiles_view;

			viewControllers[page + 1] = origView;
		}
	}

	unloadImages(page);
	profiles_view.set('view', viewControllers);
}

function setEditCancelOnViewControlls() {
	for(var i = 0; i < viewControllers.length; i++) {
		var controller = viewControllers[i];
		if(controller.parentView != null) {
			if(adding_user == true) {
				controller.profView.show();
				if(controller.profView1 != undefined)
					controller.profView1.show();
				controller.editProfView.hide();
				if(controller.editProfView1 != undefined)
					controller.editProfView1.hide();
			} else {
				controller.profView.hide();
				if(controller.profView1 != undefined)
					controller.profView1.hide();
				controller.editProfView.show();
				if(controller.editProfView1 != undefined)
					controller.editProfView1.show();
			}

		}
	}
}

function unloadImages(page) {
	for(var i = 0; i < viewControllers.length; i++) {
		if(i != page && i != page + 1 && i != page - 1) {
			var controller = viewControllers[i];
			if(controller.parentView != null) {
				//profiles_view.el.remove(controller);
				var blankView = new rel('view');
				blankView.isNull = true;

				viewControllers[i] = blankView;
			}
		}
	}
}


function addProfileMainView(user) {
	mainView = new rel('view', {
		width : 379,
		top : 0,
		left : 0,
		height : 231,
		//backgroundColor : "blue",
		//opacity : 0.2
	});
	var profView = addProfileView(user[0], mainView);
	profView.left = 0;
	profView.top = 5;
	var editProfView = editProfileView(user[0], mainView);
	editProfView.left = 0;
	editProfView.top = 0;

	if(user[1] != null && user[1] != undefined) {

		var profView1 = addProfileView(user[1], mainView);
		profView1.left = 180;
		profView1.top = 5;
		//profView1.height = 200;
		//profView1.width =170;
		var editProfView1 = editProfileView(user[1], mainView);
		editProfView1.left = 200;
		editProfView1.top = 0;
	}

	if(adding_user == true) {
		profView.show();
		editProfView.hide();
		if(user[1] != null && user[1] != undefined) {
			profView1.show();
			editProfView1.hide();
		}
	} else {
		// alert('Test');
		profView.hide();
		editProfView.show();
		if(user[1] != null && user[1] != undefined) {
			profView1.hide();
			editProfView1.show();
		}
	}

	mainView.profView = profView;
	mainView.editProfView = editProfView;
	if(user[1] != null && user[1] != undefined) {
		mainView.profView1 = profView1;
		mainView.editProfView1 = editProfView1;
	}

	mainView.el.profView = profView;
	mainView.el.editProfView = editProfView;
	if(user[1] != null && user[1] != undefined) {
		mainView.el.profView1 = profView1;
		mainView.el.editProfView1 = editProfView1;
	}

	mainView.add(profView);
	mainView.add(editProfView);
	if(user[1] != null && user[1] != undefined) {
		mainView.add(profView1);
		mainView.add(editProfView1);
	}
	return mainView;
}

/// Create View for View Profiles...
function addProfileView(user, mainView) {
	// // Ti.API.info('-----------  Add Profiles Clicked  ----------');
	// //var allProfiles = get_profiles();
	var userProfile_view = new rel('view', {
		width : 170,
		top : 5,
		left : 0,
		height : 200,
		backgroundImage : "images/globals/userprofile.png",
		//backgroundColor:"red"
		//zIndex:1
	});
	var user_name = new rel('label', {
		text : user.name.toString(),
		bottom : 12,
		left : 0,
		width : 172,
		height : 35,
		font : {
			fontSize : 30,
			fontWeight : 'bold',
			fontFamily : 'Marker Felt'
		},
		textAlign : 'center',
		color : '#fff'
	}).inject(userProfile_view);
	genderSkin = new rel('img', {
		image : "images/globals/profile-" + user.gender.toString() + "-skin-" + user.skin.toString() + ".png",
		top : 44,
		left : 28,
		width : 113,
		height : 109
	}).inject(userProfile_view);
	genderHair = new rel('img', {
		image : "images/globals/profile-" + user.gender.toString() + "-hair-" + user.hair.toString() + ".png",
		top : 44,
		left : 28,
		width : 113,
		height : 109
	}).inject(userProfile_view);

	var play_button = new rel('button', {
		backgroundImage : "images/globals/play.png",
		top : 20,
		height : 142,
		width : 148,
		left : 20

	}, {
		click : function(e) {
			current_user = user.id.toString();
			var profile_data = profile_db.execute('select * from profiles where id = ' + current_user).results;
			current_skin = profile_data.fieldByName('skin');
			current_hair = profile_data.fieldByName('hair');
			current_gender = profile_data.fieldByName('gender');
			current_spoken = profile_data.fieldByName('spoken');
			current_name = profile_data.fieldByName('name');
			setTimeout(function(e) {
				menu_win.close();
			}, 500);
			Ti.App.Properties.setInt('CurrentUser', profiles_view.currentUser);
			story.start();
		}
	}).inject(userProfile_view);
	return userProfile_view.el;
}

function editProfileView(user, mainView) {
	var userProfile_view = new rel('view', {
		width : 180,
		top : 0,
		height : 251,
		left : 0,
		// backgroundColor:"green",
		//opacity:0.3
		//backgroundImage:"images/globals/edituser_bg.png"

	});
	profileImage = new rel('img', {
		image : "images/globals/profiles.png",
		bottom : 10,
		left : 15,
		width : 174,
		height : 225
	}).inject(userProfile_view);
	genderSkin = new rel('img', {
		image : "images/globals/profile-" + user.gender.toString() + "-skin-" + user.skin.toString() + ".png",
		top : 37,
		left : 45,
		width : 113,
		height : 109
	}).inject(userProfile_view);
	genderHair = new rel('img', {
		image : "images/globals/profile-" + user.gender.toString() + "-hair-" + user.hair.toString() + ".png",
		top : 37,
		left : 45,
		width : 113,
		height : 109
	}).inject(userProfile_view);

	var user_name = new rel('label', {
		text : user.name.toString(),
		bottom : 60,
		left : 20,
		width : 165,
		height : 35,
		font : {
			fontSize : 30,
			fontWeight : 'bold',
			fontFamily : 'Marker Felt'
		},
		textAlign : 'center',
		color : '#fff'
	}).inject(userProfile_view);

	var edit_button = new rel('button', {
		bottom : 10,
		left : 18,
		height : 44,
		width : 83,
		backgroundImage : "images/globals/editbutton.png"
	}, {
		click : function(e) {
			adding_user = false;
			editing_user = true;
			var anim = new ranim({
				view : profiles_view,
				transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
			}, {
				complete : function() {
					clone_view = users_view.clone(true);
				}
			});
			createProfile(user);
		}
	}).inject(userProfile_view);

	var delete_button = new rel('button', {
		bottom : 10,
		left : 94,
		height : 44,
		width : 91,
		backgroundImage : "images/globals/deletebutton.png"
	}, {
		click : function(e) {
			var messageBox = new rel('alert', {
				title : 'Bunny Engine',
				message : 'Are you sure you want to delete this profile?',
				buttonNames : ['Yes', 'No']
			}, {
				click : function(e) {
					if(e.index == 0) {
						delete_user(user.id.toString());
						editprofiles = true;
						getProfileViews("delete");
					}
				}
			}).show();
			//profile_view.show();
		}
	}).inject(userProfile_view);

	return userProfile_view.el;
}

var picker_slide_in = new ranim({
	bottom: 0
});

var picker_slide_out = new ranim({
	bottom: -251
});

function change_size(edit) {
	profiles_view.el.top = edit ? 62 : 70;
	profiles_view.el.left = edit ? 36 : 25;
	profiles_view.el.width = edit ? 400 : 355;
	profiles_view.el.height = edit ? 251 : 215;
	mainView.el.width = edit ? 458 : 379;
	mainView.el.height = edit ? 251 : 231;
}