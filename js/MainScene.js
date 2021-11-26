import MainGamePlayScene from "./MainGamePlayScene.js";
import MainMenu from "./MainMenu.js";
import PlaySetting from "./PlaySetting.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');


    }

    preload() {
        this.load.image('card', '../assets/card.png');
    }

    create() {
        this.baseSquareSize = { x: 20, y: 20 };
        this.componentWantUpdate = [];
        this.mainGamePlayScene = new MainGamePlayScene({
            scene: this,
            width: 940,
            height: this.game.config.height,
        });

        this.mainMenu = new MainMenu({
            scene: this,
            x: this.mainGamePlayScene.width,
            y: 0,
            width: this.game.config.width - this.mainGamePlayScene.width,
            height: this.game.config.height,
        });

        this.playSetting = new PlaySetting({
            scene: this,
            x: this.mainGamePlayScene.width,
            y: 0,
            width: this.game.config.width - this.mainGamePlayScene.width,
            height: this.game.config.height,
        });
        this.playSetting.setVisible(false);

    }

    update(time, delta) {
        for (var i = 0; i < this.componentWantUpdate.length; i++) {
            if (this.componentWantUpdate[i])
                if (this.componentWantUpdate[i].update)
                    this.componentWantUpdate[i].update(time, delta);
        }
    }
}