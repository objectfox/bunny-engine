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


var arrData = [];
var viewControllers = [];
var addProfile_view, profiles_view, inner_view, control_view_h, mainView;
var control_view_v, left_view_v, left_edit_v, right_edit_v;
var genderSkin;
var genderHair;

editprofiles=false;
adding_user = true;


var bgPlayer = Ti.Media.createSound({url:"music/silence.m4a", volume: 0.1, looping: true});
bgPlayer.play();

var menu_win = new rel('window');

var menu_win = Ti.UI.createWindow({
	width:1024,
	top:0,
	height:768,
	left:0
});

var cancel =  new rel('button', {
	top:30,
	left:20,
	width:262,
	height:96,
	backgroundImage: "images/globals/backbutton-ipad.png"
}, {
	click: function(e) {
		adding_user = true;
		editing_user =  false;

		var anim = new ranim({
			view:inner_view,
			transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
		}, {
			complete: function() {

			}
		});

		menu_win.animate(anim);
		inner_view.el.backgroundImage = "images/globals/editprofile-ipad.png";
		mainView.profView.show();
		mainView.editProfView.hide();
		// inner_view.el.backgroundImage = 'images/globals/editprofiles_bg.png';
		//inner_view;
		control_view_v.show();
		control_view_h.show();
		left_view_v.show();
		inner_view.remove(cancel);
		right_edit_v.hide();
		left_edit_v.hide();
		// cancel.inject(inner_view);
		change_size(false);
		setEditCancelOnViewControlls();

	}
});

menu_win.open();
menu_win.orientationModes = [Titanium.UI.LANDSCAPE_LEFT];
// addProfile()
getProfileViews("onload");

/// Custom event for character...
Ti.App.addEventListener('SetCharacter', function(e) {
	genderSkin.el.image  = "images/globals/profile-" + current_gender + "-skin-" + current_skin + "-ipad.png";
	genderHair.el.image  = "images/globals/profile-" + current_gender + "-hair-" + current_hair + "-ipad.png";
});
function addProfile() {

	addProfile_view =  new rel('window', {
		width:1024,
		top:0,
		height:768,
		left:0,
		backgroundImage:"images/globals/addprofiles_bg-ipad.png"//,
		//zIndex:1
	});
	var add_button = new rel('button', {
		backgroundImage:"images/globals/addbutton-ipad.png",
		top:200,
		width:337,
		height:339,
		left:70
	}, {
		click: function(e) {
			adding_user =  true;
			var anim = new ranim({
				view:addProfile_view,
				transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			}, {
				complete: function() {

				}
			});
			// slide_it_up = Titanium.UI.createAnimation();
			// slide_it_up.top = 0; // to put it back to the left side of the window
			// slide_it_up.duration = 500;
			// addProfile_view.el.open(slide_it_up);
			createProfile();
		}
	}).inject(addProfile_view);

	var web_view =  new rel('label', {
		backgroundColor : 'transparent',
		bottom : 17,
		right : 10,
		height : 35,
		width : 290
	}, {
		click : function(e) {
			Titanium.Platform.openURL("http://www.bunnyagents.com/");
		}
	}).inject(addProfile_view);

	addProfile_view.open();
}

function createProfile(user) {

	if(user == null || user== undefined || add_user==true) {
		current_gender = 'boy';
		current_hair = 'black';
		current_skin = 'black';
	} else {
		current_id=user.id;
		current_gender=user.gender;
		current_hair=user.hair;
		current_skin=user.skin;
	}
	var createProfile_win =  new rel('window', {
		backgroundImage:"images/globals/new_profile-ipad.png",
		width:1024,
		top:0,
		left:0,
		height:768
	});

	var hair_arr = [];

	hair_arr.push( new rel('view', {
		left:200,
		bottom:193,
		width:100,
		height:100,
		borderRadius:12,
		backgroundColor:'black',
		borderColor:'#f00',
		borderWidth:6,
		hair_color:'black'
	}	, {
		click: function(e) {

			for ( l in hair_arr ) {
				hair_arr[l].set('borderWidth',0);
				hair_arr[l].set('borderColor','#fff');
			}

			e.source.borderWidth = 6;
			e.source.borderColor = '#f00';
			current_hair = 'black';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win) );

	hair_arr.push( new rel('view', {
		left:323,
		bottom:193,
		width:100,
		height:100,
		backgroundColor: "#463324",
		borderRadius:12,
		borderColor:'#fff',
		// borderWidth:1,
		hair_color:'brown'
	}	, {
		click: function(e) {

			for ( l in hair_arr ) {
				hair_arr[l].set('borderWidth',0);
				hair_arr[l].set('borderColor','#fff');
			}
			e.source.borderWidth = 6;
			e.source.borderColor = '#f00';
			current_hair = 'brown';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win) );

	hair_arr.push( new rel('view', {
		left:446,
		bottom:193,
		width:100,
		height:100,
		backgroundColor:"#ecbf0c",
		borderRadius:12,
		borderColor:'#fff',
		// borderWidth:1,
		hair_color:'yellow'
	}	, {
		click: function(e) {

			for ( l in hair_arr ) {
				hair_arr[l].set('borderWidth',0);
				hair_arr[l].set('borderColor','#fff');
			}

			e.source.borderWidth = 6;
			e.source.borderColor = '#f00';
			current_hair = 'yellow';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win) );

	hair_arr.push( new rel('view', {
		left:565,
		bottom:193,
		width:100,
		height:100,
		backgroundColor:"#ff6d0d",
		borderRadius:12,
		borderColor:'#fff',
		// borderWidth:1//,
		// hair_color:'red'
	}	, {
		click: function(e) {

			for ( l in hair_arr ) {
				hair_arr[l].set('borderWidth',0);
				hair_arr[l].set('borderColor','#fff');
			}

			e.source.borderWidth = 6;
			e.source.borderColor = '#f00';
			current_hair = 'red';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win) );
	var skin_arr = [];
	skin_arr.push( new rel('view', {
		left:200,
		bottom:55,
		width:100,
		height:100,
		backgroundColor:"#6d523f",
		borderRadius:12,
		borderColor:'#f00',
		borderWidth:6,
		skin_color:'black'
	}, {
		click: function(e) {

			for ( l in skin_arr ) {
				skin_arr[l].set('borderWidth',0);
				skin_arr[l].set('borderColor','#fff');
			}

			e.source.borderWidth = 6;
			e.source.borderColor = '#f00';
			current_skin = 'black';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win) );

	skin_arr.push( new rel('view', {
		left:323,
		bottom:55,
		width:100,
		height:100,
		borderRadius:12,
		backgroundColor:"#c09f80",
		borderColor:'#fff',
		// borderWidth:1,
		skin_color:'brown'
	}, {
		click: function(e) {

			for ( l in skin_arr ) {
				skin_arr[l].set('borderWidth',0);
				skin_arr[l].set('borderColor','#fff');
			}

			e.source.borderWidth = 6;
			e.source.borderColor = '#f00';
			current_skin = 'brown';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win) );

	skin_arr.push( new rel('view', {
		left:446,
		bottom:55,
		width:100,
		height:100,
		backgroundColor:"#fccbbc",
		borderRadius:12,
		borderColor:'#fff',
		// borderWidth:1,
		skin_color:'white'
	}, {
		click: function(e) {

			for ( l in skin_arr ) {
				skin_arr[l].set('borderWidth',0);
				skin_arr[l].set('borderColor','#fff');
			}

			e.source.borderWidth = 6;
			e.source.borderColor = '#f00';
			current_skin = 'white';
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win));

	genderSkin = new rel('img', {
		image:'images/globals/profile-boy-skin-black-ipad.png',
		top:245,
		right:80,
		width:220,
		height:261
	}).inject(createProfile_win);

	genderHair = new rel('img', {
		image:'images/globals/profile-boy-hair-black-ipad.png',
		top:240,
		right:72,
		width:220,
		height:237
	}).inject(createProfile_win);

	var gender_arr = [];

	var gender = new rel('img', {
		right : 55,
		bottom : 165,
		height : 89,
		width : 267,
		image : "images/globals/genderboy-ipad.png"
	}).inject(createProfile_win);

	gender_arr.push( new rel('view', {
		backgroundColor:'transparent',
		bottom:165,
		width:120,
		height:90,
		right:60
	}	, {
		click: function(e) {
			gender.el.image = "images/globals/gendergirl-ipad.png";
			current_gender = "girl";
			Ti.App.fireEvent("SetCharacter");
		}
	}).inject(createProfile_win) );

	gender_arr.push( new rel('view', {
		backgroundColor:'transparent',
		bottom:165,
		width:130,
		height:90,
		right:190
	}	, {
		click: function(e) {

			gender.el.image = "images/globals/genderboy-ipad.png";
			current_gender = "boy";
			Ti.App.fireEvent("SetCharacter");

		}
	}).inject(createProfile_win) );

	if(user != null || user !=undefined) {
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

	var name_input = new rel('input', {
		top:190,
		left:195,
		backgroundColor:'#fff',
		width:475,
		height:100,
		hintText:"Name",
		autocorrect:true,
		font: {
			fontSize:60,
			fontFamily:'Marker Felt',
			fontWeight:'bold'
		},
		returnKeyType:Titanium.UI.RETURNKEY_DONE,
		autoCapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_SENTENCES
	}, {
		focus: function(e) {
			log('Focus event');
		},
		blur: function(e) {
			log('blur event');
		}
	}).inject(createProfile_win);

	var picker_view = new rel('view', {
		left:-1024,
		width:900,
		top:220,
		height:500,
		zIndex:22,
		borderRadius:5,
		backgroundImage:'images/globals/ipadpickerbg.png'
	}).inject(createProfile_win);

	var spoken_detail = new rel('label', {
		backgroundColor : 'transparent',
		top : 25,
		left : 420,
		height : 500,
		color : '#fff',
		font : {
			fontSize : 36,
			fontFamily:'Marker Felt',
			fontColor:'#fff'
		},
		width : 460,
		text : 'Pick the name closest to how your name is pronounced on the left.  So for the name Alyx you would pick Alex, for the name Geoffry you would pick Jeffrey.  If none of the names are similar, pick Not Listed and the story will play just fine without names.'
	}).inject(picker_view);
	
	var url_button =  new rel('label', {
		backgroundColor : 'transparent',
		top : 350,
		left : 70,
		height : 70,
		width : 260
	}, {
		click : function(e) {
			Titanium.Platform.openURL("http://www.bunnyagents.com/");
		}
	}).inject(picker_view);


	var picker = new rel('picker', {
		top : 43,
		left: 0,
		width: 400,
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
		})]
	}).inject(picker_view);
	picker.set('selectionIndicator',true);

	var save = new rel('button', {
		title:'Done',
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	}, {
		click: function() {
			spoken_input.set('value', picker.getSelectedRow(0).title );
			picker_view.animate(picker_slide_out);
		}
	});

	var cancelPicker =  new rel('button', {
		title:'Cancel',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	}, {
		click: function() {
			picker_view.animate(picker_slide_out);
		}
	});
	var spacer = new rel('flex_space');

	var toolbar =  new rel('toolbar', {
		top:0,
		height:43
	}).set('items',[save,spacer,cancelPicker]).inject(picker_view);

	var spoken_input = new rel('input', {
		top:335,
		left:193,
		backgroundColor:'#fff',
		width:375,
		height:100,
		font: {
			fontSize:60,
			fontFamily:'Marker Felt',
			fontWeight:'bold'
		},
		hintText:"Pronounced Like",
		borderColor:'white',
		editable:false,
		enabled:false
		// style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	}, {
		click: function(e) {
			//name_input.el.fireEvent('return');
			picker_view.animate(picker_slide_in);

		}
	}).inject(createProfile_win);

	var cancel =  new rel('button', {
		top:30,
		left:20,
		height:96,
		width:262,
		backgroundImage: "images/globals/cancelbutton-ipad.png"
	}, {
		click: function(e) {

			slide_it_up = Titanium.UI.createAnimation();
			slide_it_up.top = 768; // to put it back to the left side of the window
			slide_it_up.duration = 500;
			createProfile_win.el.close(slide_it_up);
			profile_view.show();
		}
	}).inject(createProfile_win);

	var saveButton = new rel('button', {
		bottom:40,
		right:55,
		height:95,
		width:178,
		backgroundImage: "images/globals/savebutton-ipad.png"
	}, {
		click: function() {
			saveButton.el.enabled = false;
			if ( name_input.get('value') && spoken_input.get('value') && current_hair && current_skin && current_gender) {
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
				//var filename;
				//filename = user_data.spoken.toString();
				// Ti.API.info("---------  User Data  --------");
				// Ti.API.info("User - " + JSON.stringify(user_data));
				//get_remote_file(user_data.spoken+'.m4a', 'http://www.jeffkramer.com/dust/13-'+filename+'.m4a', function(file_obj) {
					
						log(user_data);
						var msg = "";
						if ( adding_user ) {

							add_user(user_data);
							msg = "save";

							
							user_data.profile_number = get_profiles().length;

							if(get_profiles().length == 1) {
								addProfile_view.close();
							}
							

						} else {
							// Ti.API.info('---------  Testing Area SAVE BEGIN : ' + current_id);
							// Ti.API.info('---------  Testing Area : ' + JSON.stringify(user_data));
							save_user(current_id,user_data);
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
							
							    // create request
    var xhr = Titanium.Network.createHTTPClient();
    //set timeout
    xhr.setTimeout(10000);

    //Here you set the webservice address and method
    xhr.open('POST', 'https://log.bunnyagents.com/');

    //set enconding
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    //send request with parameters
    xhr.send(JSON.stringify(user_data));

    // function to deal with errors
    xhr.onerror = function() {

    };

    // function to deal with response
    xhr.onload = function() {
       
    };

							


						getProfileViews(msg);

						slide_it_up = Titanium.UI.createAnimation();
						slide_it_up.top = 0; // to put it back to the left side of the window
						slide_it_up.duration = 500;
						createProfile_win.el.close(slide_it_up);
						/// delete
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

	if(add_user!=true && user != null && user != undefined) {
		for ( l in skin_arr ) {
			skin_arr[l].set('borderWidth',0);
			skin_arr[l].set('borderColor','#fff');
		}
		spoken_input.set('value', user.spoken.toString() );
		for ( l in hair_arr ) {
			hair_arr[l].set('borderWidth',0);
			hair_arr[l].set('borderColor','#fff');
		}
		name_input.set('value',user.name.toString());
		// for ( l in gender_arr ) {
			// gender_arr[l].set('borderWidth',0);
			// gender_arr[l].set('borderColor','#fff');
		// }
	}

	var detail_view =  new rel('label', {
		backgroundColor : 'transparent',
		bottom : 340,
		right : 350,
		height : 100,
		width : 100
	}, {
		click : function(e) {
			var web_view;
			var modal_window =  new rel('window', {
				backgroundImage : 'images/globals/editprofiles_bg-ipad.png',
				title : "Names",
				top : 0,
				left : 0,
				height : 768,
				width : 1024
			});

			var names_detail = new rel('label', {
				backgroundColor : 'transparent',
				top : 100,
				left : 40,
				height : 500,
				font : {
					fontSize : 46,
					fontFamily : 'Marker Felt'
				},
				width : 950,
				text : 'Dust Bunnies is a revolutionary storybook app where you are the star!  This is a demo of the engine that powers it.'
			}).inject(modal_window);

			modal_window.open({
				modal:true
			});

			var detail_view =  new rel('label', {
				backgroundColor : 'transparent',
				top : 570,
				left : 150,
				height : 50,
				font : {
					fontSize : 40
				},
				color : 'blue',
				width : 800,
				text : "http://www.bunnyagents.com/"
			}, {
				click : function(e) {
					web_view = new rel('webview', {
						top : 150,
						left : 20,
						height : 600,
						width : 985,
						url : 'http://www.bunnyagents.com/',
						scalesPageToFit : false
					}).inject(modal_window);
				}
			}).inject(modal_window);

			var close_button = new rel('button', {
				top : 30,
				left : 30,
				height : 96,
				width : 264,
				backgroundImage : "images/globals/closebutton-ipad.png"
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
	//
	slide_it_up = Titanium.UI.createAnimation();
	slide_it_up.top = 0; // to put it back to the left side of the window
	slide_it_up.duration = 500;
	createProfile_win.el.open(slide_it_up);

	//
	// Ti.App.fireEvent("SetCharacter");
}

// inner_view = new rel('view', {
// top:0,
// left:0,
// width:480,
// height:320,
// backgroundImage : "images/globals/editprofile.png"
//
// }, {
// scroll : function(e) {
// // current_user = arrData[e.currentPage].id;
// // var mainView = viewControllers[e.currentPage];
// // 100hPage(e.currentPage);
// }
// }).inject(menu_win);

function loadScrollViewWithPage(page) {
	//Ti.API.info("loadScrollViewWithPage >>> "+page);
	if (page < 0 || page >= arrData.length)
		return;

	if(page != 0) {
		var controller = viewControllers[page-1];
		var origView;
		if (controller.isNull) {
			var objBean = [];
			objBean.push(arrData[((page-1)*2)]);
			if((((page-1)*2)+1) <= arrData.length)
				objBean.push(arrData[((page-1)*2)+1]);
			origView = addProfileMainView(objBean);

			origView.parentView = profiles_view;

			viewControllers[page-1] = origView;
		}
	}

	var controller = viewControllers[page];
	var origView;
	//var origViewNext
	if (controller.isNull) {
		var objBean = [];
		objBean.push(arrData[(page*2)]);
		if(((page*2)+1) <= arrData.length)
			objBean.push(arrData[(page*2)+1]);

		origView = addProfileMainView(objBean);

		origView.parentView = profiles_view;
		viewControllers[page] = origView;
	}

	if (page != (arrData.length/2)-1) {
		var controller = viewControllers[page+1];
		var origView;
		if (controller != undefined && controller.isNull) {
			var objBean = [];
			objBean.push(arrData[((page+1)*2)]);
			if(((page+1)*2)+1 <= arrData.length)
				objBean.push(arrData[((page+1)*2)+1]);

			origView = addProfileMainView(objBean);

			origView.parentView = profiles_view;

			viewControllers[page+1] = origView;
		}
	}

	unloadImages(page);
	profiles_view.set('view',viewControllers);
}

function addProfileMainView(user) {
	mainView =  new rel('view', {
		width:890,
		// top:0,
		left:0//,
		// height:486,
		//backgroundColor : "red"//,
		// opacity : 0.5,
		// backgroundImage : "images/globals/userprofile-ipad.png"

	});

	var profView = addProfileView(user[0], mainView);
	profView.left = 0;
	profView.top = 40;
	var editProfView = editProfileView(user[0], mainView);
	editProfView.left = 20;
	editProfView.top = 20;

	if(user[1] != null && user[1] != undefined) {

		var profView1 = addProfileView(user[1], mainView);
		profView1.left = 380;
		profView1.top = 40;
		var editProfView1 = editProfileView(user[1], mainView);
		editProfView1.left = 430;
		editProfView1.top = 20;
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

function change_size(edit) {
	profiles_view.el.top = edit ? 150 : 140;
	profiles_view.el.left = edit ? 90 : 60;
	profiles_view.el.width = edit ? 810 : 740;
	profiles_view.el.height = edit ? 600 : 553;

	// left_view_v.height = edit ? 636 : 555;
	// left_view_v.width = edit ? 23 : 19;
	// left_view_v.top = edit ? 113 : 113;
	// Ti.API.info('The mainView : ' + mainView.el.editProfView.left);
	// mainView.el.left = edit ? 0 : 379;
	//
	// mainView.el.height = edit ? 251 : 231;
}

function setEditCancelOnViewControlls() {
	for (var i = 0; i < viewControllers.length; i++) {
		var controller = viewControllers[i];
		if (controller.parentView != null) {

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
	for (var i = 0; i < viewControllers.length; i++) {
		if (i != page && i != page+1 && i != page-1) {
			var controller = viewControllers[i];
			if (controller.parentView != null) {
				//profiles_view.el.remove(controller);
				var blankView = new rel('view');
				blankView.isNull = true;

				viewControllers[i] = blankView;
			}
		}
	}
}

function getProfileViews(from) {
	var currPage;

	arrData = get_profiles();
	if(profiles_view == null || profiles_view == undefined) {

		inner_view = new rel('view', {
			top:0,
			left:0,
			width:1024,
			height:768,
			backgroundImage : "images/globals/editprofile-ipad.png"

		}).inject(menu_win);

		profiles_view = new rel('ScrollableView', {
			showPagingControl:false,
			top:140,
			left:60,
			width:740,
			height:553,
			contentWidth:'auto',
			clipViews:false
		}, {
			scroll : function(e) {
				current_user = arrData[e.currentPage].id;
				var mainView = viewControllers[e.currentPage];
				loadScrollViewWithPage(e.currentPage);
			}
		}).inject(inner_view);

		control_view_v = new rel('view', {
			top:110,
			right:0,
			width:196,
			height:580,
			backgroundImage : "images/globals/v_image-ipad.png"
		}).inject(inner_view);
		left_view_v = new rel('view', {
			top:113,
			left:0,
			width:19,
			height:555,
			backgroundImage : "images/globals/v_imageleft-ipad.png"
		}).inject(inner_view);
		left_edit_v = new rel('view', {
			top:130,
			left:0,
			width:23,
			height:636,
			//backgroundImage : "images/globals/v_imageleft-e-ipad.png"
		}).inject(inner_view);
		right_edit_v = new rel('view', {
			top:138,
			right:0,
			width:37,
			height:629,
			//backgroundImage : "images/globals/v_imageright-e-ipad.png"
		}).inject(inner_view);
		right_edit_v.hide();
		left_edit_v.hide();
		control_view_h = new rel('view', {
			bottom:0,
			left:0,
			width:1024,
			height:60
		}).inject(inner_view);
		var add_button = new rel('button', {
			backgroundImage:"images/globals/adduserbutton-ipad.png",
			bottom:50,
			height:136,
			width:130,
			right:30
		}, {
			click: function(e) {
				adding_user =  true;
				editing_user = false;
				createProfile();
			}
		}).inject(control_view_v);

		var sound_button = new rel('img', {
			image:"images/globals/onbutton-ipad.png",
			top:298,
			height:71,
			width:152,
			left:20
		}, {
			click: function(e) {

			}
		}).inject(control_view_v);

		var sound_arr = [];
		/// Off button
		sound_arr.push( new rel('view', {
			backgroundColor:'transparent',
			top:298,
			width:80,
			height:70,
			right:27
		}	, {
			click: function(e) {

				// for ( l in subtitles_arr ) {
				// subtitles_arr[l].set('borderWidth',1);
				// subtitles_arr[l].set('borderColor','#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				sound_button.el.image = "images/globals/offbutton-ipad.png";
				globals.sound = false;
				bgPlayer.volume = 0.0;
			}
		}).inject(control_view_v) );
		/// On button
		sound_arr.push( new rel('view', {
			backgroundColor:'transparent',
			top:298,
			width:65,
			height:70,
			right:110
		}	, {
			click: function(e) {

				// for ( l in subtitles_arr ) {
				// subtitles_arr[l].set('borderWidth',1);
				// subtitles_arr[l].set('borderColor','#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				sound_button.el.image = "images/globals/onbutton-ipad.png";
				globals.sound = true;
				bgPlayer.volume = 0.1;
			}
		}).inject(control_view_v) );

		var subtitles_button = new rel('img', {
			image:"images/globals/offbutton-ipad.png",
			top:55,
			height:71,
			width:152,
			left:20
		}, {
			click: function(e) {

			}
		}).inject(control_view_v);

		var subtitles_arr = [];
		/// Off button
		subtitles_arr.push( new rel('view', {
			backgroundColor:'transparent',
			top:55,
			width:80,
			height:70,
			right:27
		}	, {
			click: function(e) {

				// for ( l in subtitles_arr ) {
				// subtitles_arr[l].set('borderWidth',1);
				// subtitles_arr[l].set('borderColor','#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				subtitles_button.el.image = "images/globals/offbutton-ipad.png";
				globals.subtitles = false;
			}
		}).inject(control_view_v) );
		/// On button
		subtitles_arr.push( new rel('view', {
			backgroundColor:'transparent',
			top:55,
			width:65,
			height:70,
			right:110
		}	, {
			click: function(e) {

				// for ( l in subtitles_arr ) {
				// subtitles_arr[l].set('borderWidth',1);
				// subtitles_arr[l].set('borderColor','#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				subtitles_button.el.image = "images/globals/onbutton-ipad.png";
				globals.subtitles = true;
			}
		}).inject(control_view_v) );

		var autoplay_button = new rel('img', {
			image:"images/globals/onbutton-ipad.png",
			top:180,
			width:152,
			height:71,
			left:20
		}, {
			click: function(e) {

			}
		}).inject(control_view_v);

		var autoplay_arr = [];
		// Off button
		autoplay_arr.push( new rel('view', {
			backgroundColor:'transparent',
			top : 181,
			width : 80,
			height : 70,
			right : 27
		}	, {
			click: function(e) {

				// for ( l in subtitles_arr ) {
				// autoplay_arr[l].set('borderWidth', 1);
				// autoplay_arr[l].set('borderColor', '#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				autoplay_button.el.image = "images/globals/offbutton-ipad.png";
				globals.autoplay = false;
			}
		}).inject(control_view_v) );
		/// On button
		autoplay_arr.push( new rel('view', {
			backgroundColor:'transparent',
			top:181,
			width:65,
			height:70,
			right:110
		}	, {
			click: function(e) {

				// for ( l in subtitles_arr ) {
				// autoplay_arr[l].set('borderWidth',1);
				// autoplay_arr[l].set('borderColor','#fff');
				// }
				//
				// e.source.borderWidth = 3;
				// e.source.borderColor = '#f00';
				autoplay_button.el.image = "images/globals/onbutton-ipad.png";
				globals.autoplay = true;
			}
		}).inject(control_view_v) );
		var editprofiles_button = new rel('button', {
			backgroundImage:"images/globals/editprofilesbutton-ipad.png",
			top:0,
			height:46,
			width:188,
			left:20
		}, {
			click: function(e) {
				// current_user = user.id.toString();
				// Ti.API.info("Current User - " + current_user);

				adding_user = false;

				var anim = new ranim({
					view:inner_view,
					transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
				}, {
					complete: function() {
						//menu_win.remove(inner_view);
						//inner_view.opacity = 0.2
					}
				});

				menu_win.animate(anim);
				//inner_view.backgroundImage = "images/globals/editprofiles_bg.png";
				//inner_view.bacgrounndColor= 'red'

				inner_view.el.backgroundImage = 'images/globals/editprofiles_bg-ipad.png';
				//inner_view;
				control_view_v.hide();
				control_view_h.hide();
				cancel.inject(inner_view);
				right_edit_v.show();
				left_edit_v.show();
				left_view_v.hide();
				//left_view_v.backgroundImage = /*edit ? */"images/globals/editprofiles_bg-ipad.png"; //: "images/globals/v_imageleft-ipad.png";
				//left_view_v.backgroundImage = 'images/globals/editprofiles_bg-ipad.png';
				change_size(true);
				//mainView.profView.hide();
				//mainView.editProfView.show();
				//
				setEditCancelOnViewControlls();

			}
		}).inject(control_view_h);

		var web_view =  new rel('label', {
			backgroundColor : 'transparent',
			top : 1,
			right : 10,
			height : 50,
			width : 290
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

		for(var i=0; i < arrData.length/2; i++) {

			var blankView = new rel('view');
			blankView.isNull = true;

			viewControllers[i] = blankView;
		}
		profiles_view.set('view',viewControllers);
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

/// Create View for View Profiles...
function addProfileView(user,mainView) {
	// // Ti.API.info('-----------  Add Profiles Clicked  ----------');
	// //var allProfiles = get_profiles();

	var userProfile_view =  new rel('view', {
		width:349,
		top:0,
		left:0,
		height:486,
		backgroundImage : "images/globals/userprofile-ipad.png"
	});
	var user_name = new rel('label', {
		text:user.name.toString(),
		bottom:23,
		// left:0,
		// width:172,
		height:80,
		font: {
			fontSize:60,
			fontWeight:'bold',
			fontFamily:'Marker Felt'
		},
		textAlign:'center',
		color:'#fff'
	}).inject(userProfile_view);
	genderSkin = new rel('img', {
		image:"images/globals/profile-" + user.gender.toString() + "-skin-" + user.skin.toString() + "-ipad.png",
		top:119,
		left:62,
		width:240,
		height:261
	}).inject(userProfile_view);
	genderHair = new rel('img', {
		image:"images/globals/profile-" + user.gender.toString() + "-hair-" + user.hair.toString() + "-ipad.png",
		top:111,
		left:72,
		width:240,
		height:237
	}).inject(userProfile_view);

	var play_button = new rel('button', {
		backgroundImage:"images/globals/play-ipad.png",
		top:31,
		width:296,
		height:342,
		left:27
	}, {

		click: function(e) {
			Ti.API.info('The User id -- ' + user.id.toString());
			current_user = user.id.toString();
			var profile_data = profile_db.execute('select * from profiles where id = ' + current_user).results;
			current_skin = profile_data.fieldByName('skin');
			current_hair = profile_data.fieldByName('hair');
			current_gender = profile_data.fieldByName('gender');
			current_spoken = profile_data.fieldByName('spoken');
			current_name = profile_data.fieldByName('name');
			setTimeout( function(e) {
				menu_win.close();
			},500);
			Ti.App.Properties.setInt('CurrentUser',profiles_view.currentUser);
			story.start();
		}
	}).inject(userProfile_view);

	return userProfile_view.el;

}

function editProfileView(user,mainView) {
	var userProfile_view =  new rel('view', {
		width:371,
		top:0,
		height:564,
		left:0,
		backgroundImage:"images/globals/profiles-ipad.png"//,
		// backgroundColor:'red',
		// opacity:0.2
	});
	// profileImage = new rel('img', {
	// image:"images/globals/profiles-ipad.png",
	// bottom:10,
	// left:15,
	// width:174,
	// height:225
	// }).inject(userProfile_view);

	genderSkin = new rel('img', {
		image:"images/globals/profile-" + user.gender.toString() + "-skin-" + user.skin.toString() + "-ipad.png",
		top:64,
		left:60,
		width:255,
		height:261
	}).inject(userProfile_view);
	genderHair = new rel('img', {
		image:"images/globals/profile-" + user.gender.toString() + "-hair-" + user.hair.toString() + "-ipad.png",
		top:57,
		left:70,
		width:255,
		height:237
	}).inject(userProfile_view);

	var user_name = new rel('label', {
		text:user.name.toString(),
		bottom:140,
		left:0,
		width:371,
		height:80,
		// backgroundColor:'red',
		font: {
			fontSize:60,
			fontWeight:'bold',
			fontFamily:'Marker Felt'
		},
		textAlign:'center',
		color:'#fff'
	}).inject(userProfile_view);

	var edit_button =  new rel('button', {
		bottom:0,
		left:0,
		width:177,
		height:106,
		backgroundImage: "images/globals/editbutton-ipad.png"
	}, {
		click: function(e) {
			adding_user =  false;
			editing_user = true;
			var anim = new ranim({
				view:profiles_view,
				transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
			}, {
				complete: function() {

					clone_view = users_view.clone(true);
				}
			});

			createProfile(user);
		}
	}).inject(userProfile_view);

	var delete_button =  new rel('button', {
		bottom:0,
		right:0,
		width:195,
		height:106,
		backgroundImage: "images/globals/deletebutton-ipad.png"
	}, {
		click: function(e) {
			var messageBox =  new rel('alert', {
				title: 'Bunny Engine',
				message: 'Are you sure you want to delete this profile?',
				buttonNames: ['Yes','No']
			}, {
				click: function(e) {
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
	left: 62,
	duration: 50
});

var picker_slide_out = new ranim({
	left: -1024,
	duration: 50
});
