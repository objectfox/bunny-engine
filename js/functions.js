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

var get_users = function() {

	var db_rows = profile_db.execute('select * from profiles').results;
	var nr_rows = db_rows.getRowCount();

	var users_data = [];

	while ( db_rows.isValidRow() ) {
		var row = new rel('tablerow', {
			className:'users',
			height:(platform == 'iphone') ? 42 : 72
		});

		var user = new rel('img', {
			url:(platform == 'iphone') ? 'images/globals/user.png' : 'images/globals/user-ipad.png',
			left:(platform == 'iphone') ? 8 : 10,
			top:(platform == 'iphone') ? 5 : 20,
			width:32,
			height:32
		}).inject(row);

		row.el.id = db_rows.fieldByName('name');

		var name = new rel('label', {
			text:db_rows.fieldByName('name'),
			color:'#fff',
			left:50,
			top:(platform == 'iphone') ? 5 : 16,
			width:(platform == 'iphone') ? 136 : 300,
			height:(platform == 'iphone') ? 32 : 40,
			font: {
				fontSize:(platform == 'iphone') ? 14 : 28
			}
		}).inject(row);

		row.el.play = new rel('button', {
			title: (users && users.get('editing')) ? 'Edit' : 'Play!',
			color:'#000',
			left:(platform == 'iphone') ? 189 : 560,
			top:(platform == 'iphone') ? 10 : 16,
			width:(platform == 'iphone') ? 60 : 80,
			height:(platform == 'iphone') ? 22 : 40,
			font: {
				fontSize:(platform == 'iphone') ? 14 : 22
			},
			id:db_rows.fieldByName('name')
		}, {
			click: function(e) {
				if ( users.get('editing') ) {

					current_user = e.source.id;
					var profile_data = profile_db.execute('select * from profiles where name = "'+current_user+'"').results;

					current_skin = profile_data.fieldByName('skin');
					current_hair = profile_data.fieldByName('hair');
					current_gender = profile_data.fieldByName('gender');
					current_spoken = profile_data.fieldByName('spoken');

					name_input.set('value', current_user);
					spoken_input.set('value', current_spoken);

					var in_picker = false;
					for (var i=0; i < picker.rows_data.length; i++) {
						if (picker.rows_data[i].title == current_spoken) {
							in_picker = i;
						}
					};

					if ( in_picker ) {
						picker.setSelectedRow(0,in_picker,true);
					} else {
						picker.setSelectedRow(0,0,true);
					}

					var anim = new ranim({
						view:profile_view,
						transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
					}, {
						complete: function() {
							clone_view = users_view.clone(true);
						}
					});
					users_view.animate(anim);

					for (var i=0; i < skin_arr.length; i++) {
						if (skin_arr[i].get('skin_color') == current_skin ) {
							skin_arr[i].set('borderWidth',3);
							skin_arr[i].set('borderColor','#f00');
						} else {
							skin_arr[i].set('borderWidth',1);
							skin_arr[i].set('borderColor','#fff');
						}
					};

					for (var i=0; i < hair_arr.length; i++) {
						if (hair_arr[i].get('hair_color') == current_hair ) {
							hair_arr[i].set('borderWidth',3);
							hair_arr[i].set('borderColor','#f00');
						} else {
							hair_arr[i].set('borderWidth',1);
							hair_arr[i].set('borderColor','#fff');
						}
					};

					for (var i=0; i < gender_arr.length; i++) {

						if (gender_arr[i].get('backgroundColor') == '#00d8ff' && current_gender == 'boy') {
							gender_arr[i].set('borderWidth',3);
							gender_arr[i].set('borderColor','#f00');
						} else if (gender_arr[i].get('backgroundColor') == '#ff808c' && current_gender == 'girl' ) {
							gender_arr[i].set('borderWidth',3);
							gender_arr[i].set('borderColor','#f00');
						} else {
							gender_arr[i].set('borderWidth',1);
							gender_arr[i].set('borderColor','#fff');
						}

					};
				} else {
					current_user = e.source.id;
					var profile_data = profile_db.execute('select * from profiles where name = "'+current_user+'"').results;
					current_skin = profile_data.fieldByName('skin');
					current_hair = profile_data.fieldByName('hair');
					current_gender = profile_data.fieldByName('gender');
					current_spoken = profile_data.fieldByName('spoken');
					story.start();
					Titanium.UI.orientation = Titanium.UI.LANDSCAPE_LEFT;
				}
			}
		}).inject(row);

		users_data.push(row);
		db_rows.next();
	};

	return users_data;
};
var save_user = function(id, data ) {

	var q_update = [];
	for ( x in data ) {
		q_update.push(' '+x+' = "'+data[x]+'"');
	}

	var query = 'update profiles set '+ q_update.join(',')+' where id = "'+id+'"';
	// Ti.API.info('---------  Testing Area : ' + JSON.stringify(data));
	profile_db.execute(query);
};
var add_user = function(data) {
	var q_cols = [], q_vals= [];

	for ( x in data ) {
		q_cols.push(x);
		q_vals.push('"'+data[x]+'"');
	}
	var query = 'insert into profiles ('+ q_cols.join(',')+') values ('+ q_vals.join(',') +')';
	profile_db.execute(query);
};
var delete_user = function(id) {

	var q = "delete from profiles where id=" + id;
	// Ti.API.info('SQL Query : ' + q);
	profile_db.execute(q);
};
var flip_card = function(view1,view2) {

};
var get_profiles = function () {

	var db_rows = profile_db.execute('select * from profiles').results;
	var nr_rows = db_rows.getRowCount();
	if(nr_rows != null && nr_rows > 0) {
		var users_data = [];
		while ( db_rows.isValidRow() ) {

			var user = {
				id : db_rows.fieldByName('id'),
				name : db_rows.fieldByName('name'),
				spoken : db_rows.fieldByName('spoken'),
				hair : db_rows.fieldByName('hair'),
				skin : db_rows.fieldByName('skin'),
				gender : db_rows.fieldByName('gender')
			};
			users_data.push(user);
			db_rows.next();
		}
		return users_data;
	} else {
		return null;
	}
};
function isArray(testObject) {	 
    return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
};
function get_my_uuid() {
	var uuid;
	var my_uuid;
	var f=Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'uuid.txt');
	if(!(f.exists())) {
		Ti.API.info('file does not exist : ' + f);
		uuid = Titanium.Platform.createUUID();
		f.write(uuid);  
	};

	my_uuid = f.read(f).text;
	
	return my_uuid;

};
