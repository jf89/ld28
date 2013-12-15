function HUD() {
	this._startedAt = game.time.now;
	this._time        = new Element(50, SCREEN_HEIGHT - 150);
	this._shields     = new Element(50, SCREEN_HEIGHT - 125);
	this._enemiesLeft = new Element(50, SCREEN_HEIGHT - 100);
	this._enemiesDead = new Element(50, SCREEN_HEIGHT -  75);
}

HUD.prototype.update = function() {
	this._time.setText('Time: ' + Math.floor((game.time.now - this._startedAt)/1000));
	this._shields.setText('Shields ' + player.shields);
	if      (player.shields == 3) this._shields.setColor('#0ff');
	else if (player.shields == 2) this._shields.setColor('#ff0');
	else if (player.shields == 1) this._shields.setColor('#f00');
	else                          this._shields.setColor('#000');
	if (!player._isDead) {
		this._enemiesLeft.setText('Enemies Left: ' + enemyContainer._enemies.length);
		this._enemiesDead.setText('Enemies Killed: ' + enemyContainer.enemiesKilled);
	}
	this._time.update();
	this._shields.update();
	this._enemiesLeft.update();
	this._enemiesDead.update();
}

HUD.prototype.destroy = function() {
	this._time.destroy();
	this._shields.destroy();
	this._enemiesLeft.destroy();
	this._enemiesDead.destroy();
}


function Element(x, y) {
	this._x = x;
	this._y = y;
	this._gameText = game.add.text(
		game.camera.x + x,
		game.camera.y + y,
		'',
		{ font: '15px Arial', fill: '#0ff' }
	);
}

Element.prototype.setText = function(text) {
	this._gameText.setText(text);
}

Element.prototype.update = function() {
	this._gameText.position.x = game.camera.x + this._x;
	this._gameText.position.y = game.camera.y + this._y;
}

Element.prototype.setColor = function(color) {
	this._gameText.setStyle({ font: '15px Arial', fill: color });
}

Element.prototype.destroy = function() {
	this._gameText.destroy();
}
