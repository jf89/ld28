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
		this.menu         = game.add.audio('menu', 1);
		this.shoot        = game.add.audio('shoot2', 1);
		this.gameover     = game.add.audio('gameover', 1);
		this.hit          = game.add.audio('hit', 1);
		this.shunt        = game.add.audio('shunt', 1);
		this.spawnerDeath = game.add.audio('spawnerdeath', 1);
		this.spawnerHit   = game.add.audio('spawnerhit', 1);
		this.spawn        = game.add.audio('spawn', 1);
	}
}
