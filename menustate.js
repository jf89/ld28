function MenuState(title, menu, backgroundCleanup) {
	this.text = null;
	this._titleStyle  = { font: '60px Arial', fill: '#f00', align: 'center' };
	this._normalStyle = { font: '40px Arial', fill: '#00c', align: 'center' };
	this._hoverStyle  = { font: '45px Arial', fill: '#09c', align: 'center' };
	this._backgroundCleanup = backgroundCleanup === undefined ? function() {} : backgroundCleanup;

	this._title = title;
	this._menu = menu;

	this._menuStack = [];
	this._currentOption = 0;
}

MenuState.prototype.init = function() {
	controls = [
		new TapControl(['forward'],   0, function() { state.move(false) }),
		new TapControl(['downarrow'], 0, function() { state.move(true) }),
		new TapControl(['fire'],      0, function() { state.select() })
	];

	this._title = game.add.text(
		game.camera.x + SCREEN_WIDTH / 2,
		game.camera.y + 150,
		this._title,
		this._titleStyle
	);
	this._title.anchor.setTo(0.5, 0.5);
	this.drawMenu();
}

MenuState.prototype.drawMenu = function() {
	this._options = new Array(this._menu.length);
	for (var i = 0; i < this._options.length; ++i) {
		this._options[i] = {};
		this._options[i].text = game.add.text(
			game.camera.x + SCREEN_WIDTH / 2,
			game.camera.y + SCREEN_HEIGHT / 2 + i * 100 - 100,
			this._menu[i].text,
			this._normalStyle
		);
		this._options[i].text.anchor.setTo(0.5, 0.5);
		this._options[i].action = this._menu[i].action;
	}
	this.updateSelection();
}

MenuState.prototype.updateSelection = function() {
	for (var i = 0; i < this._options.length; ++i)
		this._options[i].text.setStyle(
			i == this._currentOption ? this._hoverStyle : this._normalStyle
		);
}

MenuState.prototype.clearMenu = function() {
	for (var i = 0; i < this._options.length; ++i)
		this._options[i].text.destroy();
	this._currentOption = 0;
}

MenuState.prototype.move = function(down) {
	sound.menu.play();
	if (down)
		this._currentOption += 1;
	else
		this._currentOption += this._options.length - 1;
	this._currentOption %= this._options.length;
	this.updateSelection();
}

MenuState.prototype.select = function() {
	sound.menu.play();
	var action = this._options[this._currentOption].action;
	if (typeof(action) == 'function')
		action();
	else {
		this.clearMenu();
		this._menuStack.push(this._menu);
		this._menu = action;
		this.drawMenu();
	}
}

MenuState.prototype.dropLevel = function() {
	this.clearMenu();
	this._menu = this._menuStack.pop();
	this.drawMenu();
}

MenuState.prototype.update = function() {
}

MenuState.prototype.destroy = function() {
	this._backgroundCleanup();
	this.clearMenu();
	this._title.destroy();
}
