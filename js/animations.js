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

var fade_in = new ranim({
	opacity:1
});

var fade_out = new ranim({
	opacity:0
});

var move_to = function( x , y , duration, onComplete, delay) {  // an animation that moves an object to xy coords
	var anim =  new ranim({
		left:x,
		top:y,
		duration:duration,
		delay:delay || 0,
		curve:Ti.UI.iOS.ANIMATION_CURVE_LINEAR
	}, {
		complete: onComplete || $empty
	});

	return anim;
};
var spin_v = function(repeat,reverse,duration,onComplete,delay) {

	var spin_v_tr =  Ti.UI.create3DMatrix();
	spin_v_tr = spin_v_tr.translate(0,0,320);
	spin_v_tr = spin_v_tr.rotate(180,0,1,0);

	var anim = new ranim({
		transform:spin_v_tr,
		repeat:repeat,
		autoreverse:reverse,
		duration:duration,
		delay:delay || 0,
		curve:Ti.UI.iOS.ANIMATION_CURVE_LINEAR
	}, {
		complete: onComplete || $empty
	});

	return anim;
};