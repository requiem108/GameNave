
// You can write more code here
//var aim
var playerGlobal
var targetGlobal
/*var balas
var tiempoBala = 0
var botonDisparo
 var crea = true*/
/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		//this.player;
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// Player
		const player = this.add.sprite(393, 338, "center");
		player.scaleX = 0.5;
		player.scaleY = 0.5;

		// target
		const target = this.add.sprite(344, 294, "guapen");
		target.scaleX = 0.1;
		target.scaleY = 0.1;

		// minaRed
		const minaRed = this.add.sprite(438, 92, "mina");
		minaRed.scaleX = 0.7;
		minaRed.scaleY = 0.7;

		// player (components)
		new Physics(player);
		new Movement(player);

		// minaRed (components)
		const minaRedMina = new Mina(minaRed);
		minaRedMina.velocidad = 70;

		this.player = player;
		this.target = target;
		this.minaRed = minaRed;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	player;
	/** @type {Phaser.GameObjects.Sprite} */
	target;
	/** @type {Phaser.GameObjects.Sprite} */
	minaRed;

	/* START-USER-CODE */

	// Write more your code here
	shotVulcan
	minaRedGroup
	enemy_minas
	cartucho

	create() {	

		//COMPONENETES NAVE	
		this.editorCreate();
		playerGlobal = this.player
		targetGlobal = this.target


		this.player.play('up')	
		this.rotationNave(this.player,this.target)
		this.shotVulcan = this.add.group({
			defaultKey:'shotNave',
			maxSize:10,
			createCallback: function (shotNave) {
				shotNave.setName('shotNave' + this.getLength());							
				console.log('Created', shotNave.name);
			},
			removeCallback: function (shotNave) {
				console.log('Removed', shotNave.name);
			}
		})
		var timerDisparo = this.getTimerDisparo(this.player,this.shotVulcan)
		this.shotNave(timerDisparo);

		//COMPONENETES NAVE FIN---------


		this.minaRed.body.setBounce(0)
		this.minaRed.play('explo_minamina_shot')

		/**GRUPOS ENEMYS*/		
		this.minaRedGroup = this.add.group({
			defaultKey: 'mina',
			maxSize: 10,
			createCallback: function (mina) {
				var mina = mina.setName('mina_red' + this.getLength());							
				console.log('Created', mina.name);				
			},
			removeCallback: function (mina) {
				console.log('Removed', mina.name);
			}
		});

		var timerMinas = this.timerMinas(this.player,this.minaRedGroup)		

		this.physics.add.collider(this.shotVulcan,this.minaRedGroup,this.minaInpact,null,this);		

	}



	update(){	


	}

//FUNCIONES NAVE
	rotationNave(player, aim){
		//aim = this.physics.add.sprite(300,50,'p');

		this.input.on('pointermove', (pointer) =>{
		//console.log(player.y)
		var max_X = (player.x-100) < pointer.x?pointer.x:(player.x-100)
		max_X = (player.x+100) > pointer.x?max_X:(player.x+100)		
		var max_Y = (player.y-100) < pointer.y?pointer.y:(player.y-100)
		max_Y = (player.y+100) > pointer.y?max_Y:(player.y+100)	

		this.tweens.add({
			targets: aim,
			x: max_X,
			y: max_Y,
			duration: 100,
			ease: 'Sine.easeOut',
		}, this);	
		const vec = new Phaser.Math.Vector2(player.x - max_X, player.y - max_Y)
		const rotation = vec.angle()
		//console.log(rotation)
		player.setRotation(rotation+4.75)
		}, this);
	}

	getTimerDisparo(player,shotVulcan){
		var timer = this.time.addEvent({
					delay: 200,
					callback: ()=>{						
						var disparo = shotVulcan.get(player.x, player.y,"Disparo_1",true)
						if(disparo != null){
							const conponenteDisparo = new Disparo(disparo);
							conponenteDisparo.movimiento = true;
							disparo.setActive(true);
							disparo.setVisible(true);
						}						
					},
					loop: true,
					paused:true
		})

		return timer
	}

	shotNave(timerDisparo){		

		this.input.on('pointerup', function (pointer) {
			//Deja de disparar Arma primaria
			console.log('deja de disparar2')
			timerDisparo.paused = true

		},this)

		this.input.on('pointerdown', function (pointer) {

		if(!pointer.rightButtonDown()){

			if(pointer.isDown){
				timerDisparo.paused = false
			}			
		}	
    	}, this);
	}
//FUNCIONES NAVE FIN---------------------------------

//ENEMYS INICIO--------------------------------------
timerMinas(player,minaRedGroup){
	var timer = this.time.addEvent({
		delay: 200,
		callback: ()=>{	
			const x = Phaser.Math.Between((player.x-204), (player.x+204));
			const y = Phaser.Math.Between((player.y-204), (player.y+204));					
			var mina = minaRedGroup.get(x, y,"mina",true)
			
			if(mina != null){				
				var comp_mina = new Mina(mina);
				//mina = comp_mina.gameObject							
			}					
		},
		loop: true,
		paused:false
	})

	return timer
}

//ENEMYS FIN ----------------------------------------
//IMPACT COLISIONES INICIO	

	minaInpact(disparo,mina){	
		if(disparo.active & mina.life > 0){
			mina.life -= 20
			if(mina.life <=0){
				
				//mina.play('mina_explotion')
				//mina.explotar();
				
				mina.play('explo_minamina_shot')
				mina.once('animationcomplete',()=>{
					mina.setVisible(false);
					mina.setActive(false);					
				})
				
				
								
				
			}
			//mina.play('explo_minamina_shot')	
			//mina.play('inpact_mina_shot')
			
		}
		disparo.setActive(false);
		disparo.setVisible(false);
		
	}
//INPACT COLISIONES FIN------------------------------



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
