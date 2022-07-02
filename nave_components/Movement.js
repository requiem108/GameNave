
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class Movement {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__Movement"] = this;

		/* START-USER-CTR-CODE */
		const scene = this.gameObject.scene			
		this.cursors = scene.input.keyboard.createCursorKeys()		 
		scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		/* END-USER-CTR-CODE */
	}

	/** @returns {Movement} */
	static getComponent(gameObject) {
		return gameObject["__Movement"];
	}

	/** @type {Phaser.GameObjects.Sprite} */
	gameObject;

	/* START-USER-CODE */

	update(){
		this.mover_nave()
	}

	mover_nave(){
		const speed = 200
		const player = this.gameObject
		const body = player.body

		if(!body){
			return
		}

		if(this.cursors.left.isDown ||
			this.cursors.right.isDown ||
			this.cursors.up.isDown ||
			this.cursors.down.isDown){

				var movimientoX = 0 
				var movimientoY = 0 
				movimientoX = this.cursors.left.isDown?-speed:movimientoX
				movimientoX = this.cursors.right.isDown?speed:movimientoX
				movimientoY = this.cursors.up.isDown?-speed:movimientoY
				movimientoY = this.cursors.down.isDown?speed:movimientoY

				//animacion
				var animacion = 'up'
				animacion = this.cursors.left.isDown & this.cursors.right.isDown? 'up':animacion
				animacion = this.cursors.left.isDown & this.cursors.up.isDown? 'left':animacion
				animacion = this.cursors.right.isDown & this.cursors.up.isDown? 'right':animacion

				body.setVelocity(movimientoX, movimientoY)
				//player.play(animacion, true)

		}else{
			body.setVelocity(0, 0)
			const key = player.anims.currentAnim.key
			const parts = key.split('-')
			const direction = parts[0]
			player.play(`${direction}-idle`)
		}

	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
