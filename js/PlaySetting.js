import ButtonBase from "./ButtonBase.js";


export default class PlaySetting extends Phaser.GameObjects.Container {
    constructor(data) {
        let { scene, x, y, width, height } = data;
        let body = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, 0x555555);
        body.setOrigin(0);
        super(scene, x, y, [body]);
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = 1000;
        this.scene.add.existing(this);

        this.create();
    }

    create() {
        this.initButton();


    }

    initButton() {
        let label1 = new Phaser.GameObjects.Text(this.scene, this.width / 2, this.height / 2 - 120, "Have fun playing!!");
        label1.setOrigin(0.5, 0.5);
        label1.tint = 0xffffff;
        label1.displayWidth *= 2;
        label1.displayHeight *= 2;
        let label2 = new Phaser.GameObjects.Text(this.scene, this.width / 2, this.height / 2 - 80, "(^.^)");
        label2.setOrigin(0.5, 0.5);
        label2.tint = 0xffffff;
        this.goSettingBtn = new ButtonBase({
            scene: this.scene,
            x: this.width / 2,
            y: this.height / 2 - 30,
            width: 300,
            height: 50,
            text: "Go Back Setting",
            onClick: () => {
                this.setVisible(false);
                this.scene.mainGamePlayScene.setIsPlayingMainGame(false);
            }
        });
        this.newGameBtn = new ButtonBase({
            scene: this.scene,
            x: this.width / 2,
            y: this.height / 2 + 30,
            width: 300,
            height: 50,
            text: "New Game",
            onClick: () => {
                this.scene.scene.start('MainScene');
            }
        });
        this.add([this.newGameBtn, this.goSettingBtn, label1, label2]);
    }


}