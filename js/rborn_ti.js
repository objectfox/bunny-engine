// Copyright Daniel Tamas
// http.rborn.info
// MIT license
// beta 0.1

var ti_ver = parseInt(Titanium.version.replace(/\./gi,''),0 );

var $empty = function() {;
};
var rel = function(tag,options,events) {
	if ( !options)
		options = {};
	if ( !events)
		events = {};

	var el;
	switch(tag) {
		case 'img':
			if ( ti_ver > 130 ) {
				if ( !options.image )
					options.image = options.url;
				delete options.url;
			}
			el = Titanium.UI.createImageView(options);
			break;
		case 'images':
			options.images = options.url;
			delete options.url;
			el = Titanium.UI.createImageView(options);
			break;

		case 'input':
			el = Titanium.UI.createTextField(options);
			break;

		case 'textarea':
			el = Titanium.UI.createTextArea(options);
			break;

		case 'iad':

			el =  Titanium.UI.iOS.createAdView(options);
			break;

		case 'label':
			el = Titanium.UI.createLabel(options);
			break;

		case 'view':
			el = Titanium.UI.createView(options);
			break;
		case 'ScrollableView':
			el = Titanium.UI.createScrollableView(options);
			//el.views = [profile_view];
			break;

		case 'webview':
			el = Titanium.UI.createWebView(options);
			break;

		case 'window':
			el = Titanium.UI.createWindow(options);
			break;

		case 'button':
			el = Titanium.UI.createButton(options);
			break;

		case 'flex_space':
			el = Titanium.UI.createButton({
				systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
			});
			break;

		case 'toolbar':
			el = Titanium.UI.createToolbar(options);
			break;

		case 'table':
			el =  Titanium.UI.createTableView();
			break;

		case 'tablerow':
			el =  Titanium.UI.createTableViewRow(options);
			break;

		case 'tablesection':
			el =  Titanium.UI.createTableViewSection(options);
			break;

		case 'picker':
			el = Titanium.UI.createPicker(options);
			break;

		case 'buttonbar':
			el =  Titanium.UI.createButtonBar(options);
			break;

		case 'slider':
			el =  Titanium.UI.createSlider(options);
			break;

		case 'tabgroup':
			el =  Titanium.UI.createTabGroup(options);
			break;

		case 'tab':
			options.window =  !!options.window.el ? options.window.el : options.window;

			el =  Titanium.UI.createTab(options);
			break;

		case 'switch':
			!!options.value ? false : options.value =  false;
			el =  Titanium.UI.createSwitch(options);
			break;

		case 'split_view':
			options.detailView =  !!options.detailView.el ? options.detailView.el : options.detailView;
			options.masterView =  !!options.masterView.el ? options.masterView.el : options.masterView;
			el =  Titanium.UI.iPad.createSplitWindow(options);
			break;

		case 'alert':
			el = Titanium.UI.createAlertDialog(options);
			break;

		case 'popover':
			el = Titanium.UI.iPad.createPopover(options);
			break;

		case 'loading':
			el = Titanium.UI.createActivityIndicator(options);
			break;

		case 'emaildialog':

			el = Titanium.UI.createEmailDialog();

			!!(options.subject) ? el.subject = options.subject :  false;
			!!(options.to) ? el.toRecipients = options.to : false;
			!!(options.message) ? el.messageBody = options.message : false;

			if ( typeof(options.attachment) == 'string' ) {
				var f = Titanium.Filesystem.getFile(options.attachment);
				el.addAttachment(f);
			} else if( options.attachment) {
				el.addAttachment(options.attachment);
			}
			break;

	};

	el.tag=tag;
	el.options = options;

	var kids = [];
	var out = {
		el: el,
		tag:tag,
		options:options,
		id: new Date().getTime(),
		kids:kids,
		set: function() {
			var itemEls = [];
			if (tag == 'ScrollableView' && arguments[0] == 'view') {
				
				for (var i = 0;i < arguments[1].length ; i++) {
					
					itemEls.push(!!arguments[1][i].el ? arguments[1][i].el : arguments[1][i] );					
				};
				el.views = itemEls;
			}
			if ( arguments.length == 2 ) {
				if (tag == 'toolbar' && arguments[0] == 'items') {
					for (var i = arguments[1].length - 1; i >= 0; i--) {
						itemEls.push(!!arguments[1][i].el ? arguments[1][i].el : arguments[1][i] );
					};
					el.items = itemEls;
				} else if(tag != 'ScrollableView') {
					if ( tag == 'img' && arguments[0] == 'url' && ti_ver > 130 ) {
						arguments[0] = 'image';

					}
					el[arguments[0]] = !!arguments[1].el ? arguments[1].el : arguments[1];
				}
			} else {
				var props = arguments[0];
				for ( var pr in props ) {
					if (tag == 'toolbar' && pr == 'items') {
						for (var i = props[pr].length - 1; i >= 0; i--) {
							itemEls.push(!!props[pr][i].el ? props[pr][i].el : props[pr][i] );
						};
						el.items = itemEls;
					} else {
						el[pr] = !!props[pr].el ? props[pr].el : props[pr];
					}
				};
			}
			return this;
		},
		get: function(what) {
			return el[what];
		},
		addEvent: function( ev, fn ) {
			if ( tag == 'table' && ev == 'delete') {
				el.addEventListener(ev, function(e) {
					out.refresh();
					fn(e);
				});
				return this;
			}
			el.addEventListener(ev, fn);
			return this;
		},
		add: function(obj) {
			obj.r_parent = el;
			el.add(!!obj.el ? obj.el : obj);
			this.kids.push(obj);
			return this;
		},
		dispose: function() {
			el.r_parent.remove(el);
			return this;
		},
		remove: function(obj) {
			el.remove(!!obj.el ? obj.el : obj);

			var to_splice = false;

			for (var i=0; i < this.kids.length; i++) {
				if ( this.kids[i].id && obj.id && this.kids[i].id == obj.id ) {
					to_splice = i;
				}
			};

			if ( to_splice)
				this.kids.splice(to_splice,1);
			return this;
		},
		empty: function() {

			if ( this.kids && this.kids.length ) {
				for (var i=0; i < this.kids.length; i++) {
					if ( this.kids[i] )
						this.remove( this.kids[i] ) ;
				};
			}
			this.kids=[];
		},
		inject: function(obj) {
			el.r_parent = obj;
			obj.add(el);
			return this;
		},
		clone: function(with_kids, clone_kids ) {
			var cloned = new rel(this.tag,this.options ); // to add events
			if ( with_kids ) {
				if ( clone_kids ) {

				} else {
					for (var i=0; i < this.kids.length; i++) {
						cloned.add(this.kids[i]);
					};
				}
			}

			return cloned;
		},
		show: function( opts) {
			el.show(opts);
			return this;
		},
		hide: function(opts) {
			if ( tag == 'popover' )
				el.fireEvent('hide');
			el.hide(opts);
			return this;
		},
		animate: function(animation) {
			var anim = !!animation.anim ? animation.anim : animation;
			el.animate(anim);
			return this;
		}
	};

	for ( var ev in events ) {
		out.addEvent(ev, events[ev]);
	};

	switch(tag) {
		case 'window':
			out.open = function(opts) {
				el.open(opts);
				return this;
			};
			out.close = function(opts) {
				el.close(opts || {});
				return this;
			};
			out.hideNavBar = function() {
				el.hideNavBar();
				return this;
			};
			out.showNavBar = function() {
				el.showNavBar();
				return this;
			};
			out.hideTabBar = function() {
				el.hideTabBar();
				return this;
			};
			out.showTabBar = function() {
				el.showTabBar();
				return this;
			};
			out.setRightNavButton = function(button) {
				el.setRightNavButton( !!button.el ? button.el : button);
			};
			out.setLeftNavButton = function(button) {
				el.setRightNavButton( !!button.el ? button.el : button);
			};
			break;

		case 'split_view':
			out.open = function(opts) {
				el.open(opts);
				return this;
			};
			// out.close = function(opts) { el.close(opts); return this; };
			// out.hideNavBar = function(){ el.hideNavBar(); };
			// out.showNavBar = function(){ el.showNavBar(); };
			break;

		case 'tab':
			out.open = function(what,opts) {
				if ( what && what.el ) {
					el.open( what.el, opts );
				} else {
					el.open( what, opts);
				}
				return this;
			};
			out.close = function(opts) {
				el.close(opts);
				return this;
			};
			out.add = function(tab) {
				el.addTab(tab.el);
				return this;
			};
			break;

		case 'tabgroup':
			out.open = function(opts) {
				el.open(opts);
				return this;
			};
			out.close = function(opts) {
				el.close(opts);
				return this;
			};
			out.add = function(tab) {
				el.addTab(tab.el);
				return this;
			};
			break;

		case 'table':

			out.appendRow = function(row, animation ) {
				var row = !!row.el ? row.el : row;
				var animation = (!!animation && !!animation.anim) ? animation.anim : (!!animation ? animation : null );
				this.el.appendRow(row);
			};
			out.deleteRow = function(idx, animation) {
				// var row = !!row.el ? row.el : row;
				var animation = (!!animation && !!animation.anim) ? animation.anim : (!!animation ? animation : null );
				this.el.deleteRow(idx);
				this.el.fireEvent('delete');
			};
			out.selectRow = function(idx) {
				this.el.selectRow(idx);
			};
			out.refresh = function() {
				var new_rows = [];

				this.sections = this.el.data;

				if ( this.sections ) {
					for(var i = 0; i < this.sections.length; i++) {
						var section = this.sections[i];

						for(var j = 0; j < section.rowCount; j++) {
							var row = section.rows[j];
							new_rows.push(row);
						}
					}
				}

				this.rows = new_rows;

			};
			out.setData = function(data,animation) {

				var unique_classname = new Date().getTime();

				// log('we set data');
				var real_data = [];

				if (data && data[0] && data[0].el ) {

					each(data, function(the_row) {
						the_row.el.className = the_row.el.className+''+unique_classname;
						real_data.push(the_row.el);
					});
				} else {
					each(data, function(the_row) {
						the_row.className = the_row.className+''+unique_classname;
						real_data.push(the_row);
					});
				};

				this.el.setData(real_data,animation);

				setTimeout( function() {
					// log('we refresh');
					out.refresh();
				},100);
				return this;
			};
			if (options.data && options.data[0] && options.data[0].el ) {
				out.setData(options.data);
			}

			break;

		case 'input':
			out.blur = function() {
				el.blur();
				log('blur');
				return this;
			};
			out.focus = function() {
				el.focus();
				return this;
			};
			// case 'tablerow':
			// out.rowData = el.rowData;
			break;

		case 'textarea':
			out.blur = function() {
				el.blur();
				return this;
			};
			out.focus = function() {
				el.focus();
				return this;
			};
			// case 'tablerow':
			// out.rowData = el.rowData;
			break;

		case 'picker':
			out.rows_data =  options.rows_data;
			out.el.add(options.rows_data);
			out.getSelectedRow = function(col_id) {
				return el.getSelectedRow(col_id);
			};
			out.setSelectedRow = function(col_id, row_id, animated) {
				animated = ( animated === false ) ? false : true;
				return el.setSelectedRow(col_id,row_id, animated);
			};
			break;

		case 'emaildialog':
			out.open = function() {
				el.open();
				return this;
			};
			break;
	};

	return out;
};
var rsnd = function(file, volume, opts ) {
	var snd_arr = [];
	var s;

	if ( typeof file == 'string') {
		s = Titanium.Media.createSound({
			url:file,
			idx:0,
			volume:volume
		});
	} else {

		for (var i=0; i < file.length; i++) {
			var snd = Titanium.Media.createSound({
				url:file[i],
				idx:i,
				volume:volume
			});
			if ( i == 0 ) {
				s = snd;
			}
			if ( i < file.length ) {
				snd.addEventListener('complete', function(e) {
					snd_arr[e.source.idx+1].play();
					out.sound = snd_arr[e.source.idx+1];
					snd_arr[e.source.idx].release();
				});
				snd_arr.push(snd);
			} else {
				s = Titanium.Media.createSound({
					url:file[i],
					idx:i,
					volume:volume
				});
				snd_arr.push(s);
			}
		};
	}

	// we need a way to concatenate files

	var out = {
		snd_arr:snd_arr,
		sound:s,
		// snd_arr:snd_arr,
		addEvent: function( ev, fn ) {
			if ( this.snd_arr.length ) {
				var last_sound = this.snd_arr[this.snd_arr.length-1];
				last_sound.addEventListener(ev, fn );
				return this;
			} else {
				this.sound.addEventListener(ev, fn );
				return this;
			}
		},
		removeEvent: function(ev) {
			this.sound.removeEventListener(ev);
			return this;
		},
		play: function() {
			// 	log('s '+this.sound);
			// if ( this.snd_arr.length ) this.snd_arr[0].play();
			// else this.sound.play();
			this.sound.play();

			return this;
		},
		stop: function() {
			if ( this.sound.isPlaying() )
				this.sound.stop();
			return this;
		},
		pause: function() {
			if ( this.sound.isPlaying() )
				this.sound.pause();
			return this;
		},
		resume: function() {
			if ( this.sound.isPaused() )
				this.sound.play();
			return this;
		},
		release: function() {
			this.stop();
			this.sound.release();
			return this;
		},
		set: function(new_file) {
			this.sound.url = new_file;
			return this;
		},
		isPaused: function() {
			return this.sound.isPaused();
		}
	};

	return out;
};
var ranim = function(props,events) {
	var anim = Titanium.UI.createAnimation();

	for ( var pr in props ) {
		(pr == 'transform' && !!props[pr].tr) ? anim[pr] = props[pr].tr : anim[pr] = props[pr];
		(pr == 'view' && !!props[pr].el) ? anim[pr] = props[pr].el : anim[pr] = props[pr];
	};

	for ( var ev in events ) {
		anim.addEventListener(ev, events[ev]);
	};

	var out = {
		anim:anim,
		set: function() {
			if ( arguments.length == 2 ) {
				anim[arguments[0]] = arguments[1];
			} else {
				var props = arguments[0];
				for ( var pr in props ) {
					anim[pr] = props[pr];
				};
			}
			return this;
		},
		addEvent: function( ev, fn ) {
			anim.addEventListener(ev, fn );
			return this;
		}
	};

	return out;

};
var rtrans = function(anim_type, opts) {
	var tr = (anim_type=='2d') ? Titanium.UI.create2DMatrix() : Titanium.UI.create3DMatrix();

	for ( var op in opts ) {
		tr = eval( 'tr.'+op+'('+opts[op]+')' );
	}
	var out = {
		tr:tr
	};
	return out;
};
// timer

var rtimer = function( m , s, fn_tick, fn_end  ) {
	return {
		total_sec:m*60+s,
		timer:this.timer,
		set: function(m,s) {
			this.total_sec = parseInt(m,0)*60+parseInt(s,0);
			this.time = {
				m:m,
				s:s
			};
			return this;
		},
		start: function() {
			var self = this;

			this.timer = setInterval( function() {
				if (self.total_sec) {
					self.total_sec--;
					self.time = {
						m : parseInt(self.total_sec/60,0),
						s: (self.total_sec%60)
					};
					fn_tick();
				} else {
					self.stop();
				}
			}, 1000 );
			return this;
		},
		stop: function() {
			clearInterval(this.timer);
			// this.time = {m:0,s:0};
			// this.total_sec = 0;
			fn_end();
			return this;
		}
	};
};
// persistent settings

var r_persist = function(name,jsondata) {

	var out= {
		dispose: function(name) {
			Titanium.App.Properties.setString(name,'');
		},
		set: function(name,jsondata) {
			Titanium.App.Properties.setString(name, JSON.stringify( jsondata ) );
			this[name] = jsondata;
		},
		get: function(name) {
			if ( Titanium.App.Properties.getString(name) )
				this[name] = JSON.parse( Titanium.App.Properties.getString(name) );
			else
				this[name] = false;

			return this;
		}
	};

	if ( name && jsondata && !Titanium.App.Properties.getString(name) ) {
		out.set(name,jsondata);
	} else if ( name ) {
		out.get(name);
	}
	return out;
};
// database

var rdb = function(database) {
	if ( database )
		var db = Titanium.Database.open(database);
	else
		db = null;
	return {
		db:db,
		results:null,
		install: function(path, database) {

			this.db = Titanium.Database.install(path,database);
			return this;
		},
		open: function(database) {
			this.db = Titanium.Database.open(database);
			return this;
		},
		execute: function(sql) {
			this.results = this.db.execute(sql);
			return this;
		},
		close: function() {
			this.db.close();
			this.db =  null;
			this.results =  null;
			return this;
		},
		dispose: function() {
			this.db.remove();
			this.db =  null;
			this.results =  null;
			return this;
		},
		remove: function() {
			return this;
		},
		insert: function(dataset) {
			return this;
		},
		update: function() {
			return this;
		},
		get: function(what) {
			return this.db[what];
		},
		'export_results': function(format) {
			// default is json

			var export_data='';

			var nr_fields = this.results.fieldCount();

			var header = [];

			if ( nr_fields > 0 ) {
				for (var i=0; i < nr_fields; i++) {
					header.push(this.results.fieldName(i));
				};

				if ( format == 'csv' ) {
					export_data = [];
					export_data.push(header.join(','));

					while (this.results.isValidRow() ) {
						var row = [];
						for (var i=0; i < nr_fields; i++) {
							row.push(this.results.field(i));
						};

						export_data.push(row.join(','));
						this.results.next();
					}

					return export_data.join('\n');
				} else {
					export_data = [];

					while (this.results.isValidRow() ) {
						var row = {};
						for (var i=0; i < nr_fields; i++) {
							row[ header[i] ] = this.results.field(i);
						};

						export_data.push(row);
						this.results.next();
					}

					return export_data;

				}

			}

			return false;
		}
	};
};
var r_ajax = function(url,on_ok, on_err, method) {
	var method = !!method ? method : 'POST';
	var xhr = Titanium.Network.createHTTPClient();

	xhr.onload = on_ok;
	xhr.onerror = on_err;

	xhr.open(method,url);

	return {
		xhr:xhr,
		send: function(data) {
			xhr.send(data);
		}
	};
};
var get_remote_file = function(filename, url, fn_end, fn_progress ) {
	var file_obj = {
		file:filename,
		url:url,
		path: null
	};

	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
	if ( file.exists() ) {
		file_obj.path = Titanium.Filesystem.applicationDataDirectory+Titanium.Filesystem.separator;
		fn_end(file_obj);
	} else {

		if ( Titanium.Network.online ) {
			var c = Titanium.Network.createHTTPClient();

			c.setTimeout(10000);
			c.onload = function() {

				if (c.status == 200 ) {
					log('finished downloading '+ filename +' from '+url);

					var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
					f.write(this.responseData);
					file_obj.path = Titanium.Filesystem.applicationDataDirectory+Titanium.Filesystem.separator;
				} else {
					file_obj.error = 'file not found'; // to set some errors codes
				}
				fn_end(file_obj);

			};
			c.ondatastream = function(e) {
				log('progress '+ filename +':'+e.progress);
				if ( fn_progress )
					fn_progress(e.progress);
			};
			c.error = function(e) {
				log('error '+e.error);
				file_obj.error = e.error;
				fn_end(file_obj);
			};
			c.open('GET',url);
			c.send();
		} else {
			file_obj.error = 'please make sure you\'re connected to the internet, then tap save again';
			fn_end(file_obj);
		}

	}
};
function check_network() {
	return Titanium.Network.online;
}

// rand array sort

function randOrd() {
	return (Math.round(Math.random())-0.5);
}

function randNr(nr) {
	return Math.floor(Math.random()*(nr+1) );
}

function get_rand(arr,nr) {
	arr.sort(randOrd);

	if (!nr || nr==1)
		return arr[0];
	else
		return arr.slice(0,nr);

}

// utils

function leadingZeros(num, totalChars, padWith) {
	num = num + "";
	padWith = (padWith) ? padWith : "0";
	if (num.length < totalChars) {
		while (num.length < totalChars) {
			num = padWith + num;
		}
	} else {
	}

	if (num.length > totalChars) { //if padWith was a multiple character string and num was overpadded
		num = num.substring((num.length - totalChars), totalChars);
	} else {
	}

	return num;
}

chain = function(args) {
	return function() {
		for(var i = 0; i < args.length; i++) {
			args[i]();
		}
	};
};
var log = Titanium.API.info;

// timeout fix ??

function timeoutObject() {
	this.flag = true;
}

function mySetTimeout(callback, time) {
	var myCallback = callback;
	if (typeof callback == 'string') {
		myCallback = function() {
			eval(callback);
		};
	}
	var timerobj = new timeoutObject();
	setTimeout( function () {
		if (timerobj.flag) {
			myCallback();
		}
	}, time);
	return timerobj;
}

function myClearTimeout(timer) {
	if (timer.flag)
		timer.flag = false;
}

function in_array(array,needle) {

	for (var i=0;i<array.length;i++) {
		if(array[i] == needle) {
			return true;
		}
	}
	return false;
}

function unique(a) {
	var r = [];
	o:
	for(var i = 0, n = a.length; i < n; i++) {
		for(var x = i + 1 ; x < n; x++) {
			if(a[x]==a[i])
				continue o;
		}
		r[r.length] = a[i];
	}
	return r;
}

function date(j,k) {
	var l=this,d,a,h=/\\?([a-z])/gi,g,e= function(b,c) {
		return(b+="").length<c?Array(++c-b.length).join("0")+b:b;
	},i=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],m= {
		1:"st",
		2:"nd",
		3:"rd",
		21:"st",
		22:"nd",
		23:"rd",
		31:"st"
	};
	g= function(b,c) {
		return a[b]?a[b]():c;
	};
	a= {
		d: function() {
			return e(a.j(),2);
		},
		D: function() {
			return a.l().slice(0,3);
		},
		j: function() {
			return d.getDate();
		},
		l: function() {
			return i[a.w()]+
			"day";
		},
		N: function() {
			return a.w()||7;
		},
		S: function() {
			return m[a.j()]||"th";
		},
		w: function() {
			return d.getDay();
		},
		z: function() {
			var b=new Date(a.Y(),a.n()-1,a.j()),c=new Date(a.Y(),0,1);
			return Math.round((b-c)/864E5)+1;
		},
		W: function() {
			var b=new Date(a.Y(),a.n()-1,a.j()-a.N()+3),c=new Date(b.getFullYear(),0,4);
			return 1+Math.round((b-c)/864E5/7);
		},
		F: function() {
			return i[6+a.n()];
		},
		m: function() {
			return e(a.n(),2);
		},
		M: function() {
			return a.F().slice(0,3);
		},
		n: function() {
			return d.getMonth()+1;
		},
		t: function() {
			return(new Date(a.Y(),
				a.n(),0)).getDate();
		},
		L: function() {
			var b=a.Y(),c=b%400,f=b%100;
			return 0+(!(b&3)&&(f||!c));
		},
		o: function() {
			var b=a.n(),c=a.W();
			return a.Y()+(b===12&&c<9?-1:b===1&&c>9);
		},
		Y: function() {
			return d.getFullYear();
		},
		y: function() {
			return(a.Y()+"").slice(-2);
		},
		a: function() {
			return d.getHours()>11?"pm":"am";
		},
		A: function() {
			return a.a().toUpperCase();
		},
		B: function() {
			var b=d.getUTCHours()*3600,c=d.getUTCMinutes()*60,f=d.getUTCSeconds();
			return e(Math.floor((b+c+f+3600)/86.4)%1E3,3);
		},
		g: function() {
			return a.G()%12||12;
		},
		G: function() {
			return d.getHours();
		},
		h: function() {
			return e(a.g(),2);
		},
		H: function() {
			return e(a.G(),2);
		},
		i: function() {
			return e(d.getMinutes(),2);
		},
		s: function() {
			return e(d.getSeconds(),2);
		},
		u: function() {
			return e(d.getMilliseconds()*1E3,6);
		},
		e: function() {
			return"UTC";
		},
		I: function() {
			var b=new Date(a.Y(),0),c=Date.UTC(a.Y(),0),f=new Date(a.Y(),6),n=Date.UTC(a.Y(),6);
			return 0+(b-c!==f-n);
		},
		O: function() {
			var b=d.getTimezoneOffset();
			return(b>0?"-":"+")+e(Math.abs(b/60*100),4);
		},
		P: function() {
			var b=a.O();
			return b.substr(0,3)+":"+b.substr(3,2);
		},
		T: function() {
			return"UTC";
		},
		Z: function() {
			return-d.getTimezoneOffset()*60;
		},
		c: function() {
			return"Y-m-d\\Th:i:sP".replace(h,g);
		},
		r: function() {
			return"D, d M Y H:i:s O".replace(h,g);
		},
		U: function() {
			return d.getTime()/1E3|0;
		}
	};
	this.date= function(b,c) {
		l=this;
		d=typeof c==="undefined"?new Date:c instanceof Date?new Date(c):new Date(c*1E3);
		return b.replace(h,g);
	};
	return this.date(j,k);
};

function isUnsignedInteger(s) {
	return (s.toString().search(/^[0-9]+$/) == 0);
}

function trim(a) {
	return a.replace(/^\s+|\s+$/g,"");
};

function ltrim(a) {
	return a.replace(/^\s+/,"");
};

function rtrim(a) {
	return a.replace(/\s+$/,"");
};

function each(obj, fn ) {
	for( var i in obj ) {
		fn(obj[i]);
	}
}

function filter(obj,fn) {
	var results = [];
	for( var i in obj ) {
		if ( fn(obj[i]) )
			results.push(obj[i]);
	}
	return results;
};

function mask(str,m) {
	var m, l = (m = m.split("")).length, s = str.split(""), j = 0, h = "";
	for(var i = -1; ++i < l;)
		if(m[i] != "#") {
			if(m[i] == "\\" && (h += m[++i]))
				continue;
			h += m[i];
			i + 1 == l && (s[j - 1] += h, h = "");
		} else {
			if(!s[j] && !(h = ""))
				break;
			(s[j] = h + s[j++]) && (h = "");
		}
	return s.join("") + h;
};