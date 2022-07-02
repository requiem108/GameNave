
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class Disparo extends UserComponent {

	constructor(gameObject) {
		super(gameObject);

		this.gameObject = gameObject;
		gameObject["__Disparo"] = this;

		/* START-USER-CTR-CODE */		
		this.disparo = this.gameObject	
		const scene = this.gameObject.scene
		scene.physics.add.existing(this.disparo)
		this.disparo.scaleX = 0.5
		this.disparo.scaleY = 0.3
		this.disparo.setActive(false);
        this.disparo.setVisible(false);

		//this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		//this.scene.events.once(Phaser.Scenes.Events.UPDATE,this.start,this)	
		/* END-USER-CTR-CODE */
	}

	/** @returns {Disparo} */
	static getComponent(gameObject) {
		return gameObject["__Disparo"];
	}

	/** @type {Phaser.GameObjects.Image} */
	gameObject;
	/** @type {boolean} */
	movimiento = 0;
	/** @type {number} */
	duracion = 5000;
	/** @type {number} */
	velocidad = 350;
	/** @type {string} */
	nombre = "normal";
	/** @type {number} */
	damage = 20;

	/* START-USER-CODE */
	update(){
		//this.scene.physics.add.existing(this.gameObject,this.movimiento)
		//debugger
		const body = this.disparo.body
		body.setSize(100, 100)


		if(this.movimiento){
			var res = this.calcularDireccion()

			if(res['x']==0 && res['y']== 0){
				console.log(`rotacion${playerGlobal.rotation}`)
			}
			body.setVelocity(res['x'], res['y'])					
			this.movimiento = false
		}

		if (this.disparo.y < -50 || this.disparo.y > 700 || this.disparo.x < -43 || this.disparo.x > 866){
                this.disparo.setActive(false);
                this.disparo.setVisible(false);
        }
	}

	calcularDireccion(){
		var velocidad = this.velocidad
		var velX = 0
		var dirX = 0
		var velY = 0            
		var res=[];

		//Cordenadas
		var abajoPositivo = 3
		var arriba = 0
		var derecha = 1.6
		var izquierda = -1.6
		var abajoNegativo = -3.14066
		var diferencia = abajoPositivo - derecha//Esto representa el 100% del bloque de abajo
		var dif_rotacion = playerGlobal.rotation < 0?abajoPositivo + playerGlobal.rotation : abajoPositivo - playerGlobal.rotation//Esto representa la cifra a pasar a porcentaje derecha abajo

		this.disparo.rotation = playerGlobal.rotation	

		//Calcular la velocidad 
		if(playerGlobal.rotation > derecha){//abajo derecha
			dirX = ((dif_rotacion *100)/ diferencia)/100 
			velY = (1-dirX) * velocidad
			velX = dirX * velocidad
		}
		if(playerGlobal.rotation <= derecha && playerGlobal.rotation >= arriba ){//derecha arriba
			dirX = ((playerGlobal.rotation *100)/ derecha)/100
			velX = dirX * velocidad
			velY = (dirX-1) * velocidad
		}
		if(playerGlobal.rotation < arriba && playerGlobal.rotation >= izquierda ){//izquierda arriba
			dirX = ((playerGlobal.rotation *100)/ izquierda)/100
			velX = dirX * velocidad * -1
			velY = (dirX-1) * velocidad
		}
		if(playerGlobal.rotation < izquierda && playerGlobal.rotation >= abajoNegativo ){//abajo izuierda
			dirX = ((dif_rotacion *100)/ diferencia)/100 
			velY = (1-dirX) * velocidad
			velX = (dirX * velocidad) *-1
		}


		res['x']=velX
		res['y']=velY
		return res;
	}	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
