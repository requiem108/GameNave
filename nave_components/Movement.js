
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class Movement {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__Movement"] = this;

		/* START-USER-CTR-CODE */
		this.body = this.gameObject.body
		this.body.setSize(70, 70)
		this.gameObject.life = this.life

		this.gameObject.DamagePlayer=this.DamagePlayer()

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
	/** @type {number} */
	life = 140;
	/** @type {number} */
	speed = 200;
	/** @type {boolean} */
	invulnerable = false;

	/* START-USER-CODE */

	update(){
		this.mover_nave()
	}

	mover_nave(){
		const speed = this.speed
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
			//const key = player.anims.currentAnim.key
			//const parts = key.split('-')
			//const direction = parts[0]
			//player.play(`${direction}-idle`) 
		}

	}

	DamagePlayer(){
		
		return (player,damage)=>{			

			if(!this.invulnerable){

				this.gameObject.life -= damage
				console.log(`DAÑOOO ${player.life} - ${damage}`)
				this.invulnerable = true;

				if(player.life < 0){
					player.play('explo_minamina_shot',true)
					player.once('animationcomplete',()=>{
						//GAME OVER
						player.play('up')
						//player.life = 140
					})
				}else{				
					
					player.play('up',true)
					player.once('animationcomplete',()=>{
						this.invulnerable=false
					})

				}
			}
			
		}
		
		
		
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
