function TapControl(keymap, controls, repeatDelay, action) {
	this._keymap = keymap;
	this._controls = controls;
	this._canRepeat = true;
	this._repeatDelay = repeatDelay;
	this._repeatAfter = 0;
	this._action = action;
}

TapControl.prototype.pollInput = function(time) {
	var controlDown = false;
	for (var i = 0; i < this._controls.length; ++i)
		if (this._keymap[this._controls[i]].isDown)
			controlDown = true;

	if (!this._canRepeat) {
		if (!controlDown)
			this._canRepeat = true;
	} else if (controlDown) {
		if (time > this._repeatAfter) {
			this._repeatAfter = time + this._repeatDelay;
			this._canRepeat = false;
			this._action();
		}
	}
}
