
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class Mina {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__Mina"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.gameObject.life = 	this.life	
		this.gameObject.explotar = ()=>{this.explocion(this.gameObject)}	
		this.scene = this.gameObject.scene
		this.scene.physics.add.existing(this.gameObject)

		this.body = this.gameObject.body
		this.body.setSize(70, 70)
		this.gameObject.scaleX = 0.7;
		this.gameObject.scaleY = 0.7;
		this.gameObject
		.setActive(true)
		.setVisible(true)
		//.setTint(Phaser.Display.Color.RandomRGB().color)

		this.activarMina(0,1,this.gameObject)

		this.scene.events.on(Phaser.Scenes.Events.UPDATE,this.update,this)	
		/* END-USER-CTR-CODE */
	}

	/** @returns {Mina} */
	static getComponent(gameObject) {
		return gameObject["__Mina"];
	}

	/** @type {Phaser.GameObjects.Image} */
	gameObject;
	/** @type {number} */
	life = 100;
	/** @type {number} */
	velocidad = 20;

	/* START-USER-CODE */
	body;	

	update(){	

		

		this.scene.physics.moveToObject(this.gameObject, playerGlobal, 10);

		if(this.gameObject.x >820 || this.gameObject.x < -10
		|| this.gameObject.y > 630 || this.gameObject.y < -10){
			this.gameObject.setActive(false);
			this.gameObject.setVisible(false);
			console.log('mina eliminada')
		}
	}

	activarMina(inicio,fin,mina){//ANIMACION
		mina.setActive(true);
		this.scene.tweens.add({
			targets: mina,			
			alpha: { from: inicio, to: fin },		
			ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
			duration: 1000,
			repeat: 0,            // -1: infinity
			yoyo: false,
			onComplete:()=>{
				if(this.activar){
					mina.setVisible(true);
				}				
				
			}
		});
	}

	explocion(mina){
		console.log('EXPLOTAAAAAA')
		mina.play('explo_minamina_shot')
		this.scene.tweens.add({
			targets: mina,			
			alpha: { from: 1, to: .1 },		
			ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
			duration: 1000,
			repeat: 0,            // -1: infinity
			yoyo: false,
			onComplete:()=>{
				
					mina.setVisible(false);
					mina.setActive(false);
								
				
			}
		});
	} 		

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
