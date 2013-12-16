sound = {
	load: function() {
		game.load.audio('menu', 'menu.ogg');
		game.load.audio('shoot1', 'shoot.ogg');
		game.load.audio('shoot2', 'shoot2.ogg');
		game.load.audio('shoot3', 'laser.ogg');
		game.load.audio('gameover', 'gameover.ogg');
		game.load.audio('hit', 'hit.ogg');
		game.load.audio('shunt', 'shunt.ogg');
		game.load.audio('spawnerdeath', 'spawndeath.ogg');
		game.load.audio('spawnerhit', 'spawnerhit.ogg');
		game.load.audio('spawn', 'spawn.ogg');
	},
	create: function() {
		this.menu         = new Sound('menu');
		this.shoot        = new Sound('shoot2');
		this.gameover     = new Sound('gameover');
		this.hit          = new Sound('hit');
		this.shunt        = new Sound('shunt');
		this.spawnerDeath = new Sound('spawnerdeath');
		this.spawnerHit   = new Sound('spawnerhit');
		this.spawn        = new Sound('spawn');
	}
}

var SOUND_ENABLED = true;

function Sound(name) {
	this._gameObj = game.add.audio(name, 1);
}

Sound.prototype.play = function() {
	if (SOUND_ENABLED)
		this._gameObj.play();
}
