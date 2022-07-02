
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class MinaGroup {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__MinaGroup"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {MinaGroup} */
	static getComponent(gameObject) {
		return gameObject["__MinaGroup"];
	}

	/** @type {Phaser.GameObjects.Container} */
	gameObject;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
