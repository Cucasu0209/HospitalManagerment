import ButtonBase from "./ButtonBase.js";

export default class MainSettingScene extends Phaser.Scene {
    constructor() {
        super('MainSettingScene');
    }

    preload() {

    }

    create() {
        // this.input.on('pointerdown', () => this.scene.start('MainScene'));
        // console.log(this.game.config.width)
        this.Start = new ButtonBase({
            scene: this,
            x: this.game.config.width / 2,
            y: this.game.config.height / 2,
            width: 300,
            height: 70,
            text: "Start New Game",
            onClick: () => {
                this.scene.start('MainScene')
            },
        });

    }

    update(time, delta) {

    }
}