import ButtonBase from "./ButtonBase.js";
import EditMenu from "./EditMenu.js";

export default class MainMenu extends Phaser.GameObjects.Container {
    constructor(data) {
        let { scene, x, y, width, height } = data;
        let body = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, 0x555555);
        body.setOrigin(0);
        super(scene, x, y, [body]);
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.scene.add.existing(this);

        this.create();
    }

    create() {
        this.initButton();

        this.editMenu = new EditMenu({
            scene: this.scene,
            x: this.x,
            y: 300,
            width: this.width,
            height: this.height - 300,
        })
    }

    initButton() {
        this.roomBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 100,
            y: this.y + 50,
            width: 150,
            height: 30,
            text: "New Room",
            onClick: () => {
                this.scene.mainGamePlayScene.createNewRoom();
            }
        });
        this.avgBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 100,
            y: this.y + 100,
            width: 150,
            height: 30,
            text: "New AVG",
            onClick: () => {
                this.scene.mainGamePlayScene.createNewAVG();
            }
        });
        this.bedBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 100,
            y: this.y + 150,
            width: 150,
            height: 30,
            text: "New Bed",
            onClick: () => {
                this.scene.mainGamePlayScene.createNewBed();
            }
        });
        this.robotBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 100,
            y: this.y + 200,
            width: 150,
            height: 30,
            text: "New Robot",
            onClick: () => {
                this.scene.mainGamePlayScene.createNewRobot();
            }
        });

        this.playerBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 300,
            y: this.y + 50,
            width: 150,
            height: 30,
            text: "New Player",
            onClick: () => {
                this.scene.mainGamePlayScene.createNewPlayer();
            }
        });
        this.peopleBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 300,
            y: this.y + 100,
            width: 150,
            height: 30,
            text: "People Setting",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
                this.editMenu.hideAllEditMenu();
                this.editMenu.setPeopleEditorActive(true);
                // this.scene.mainGamePlayScene.createNewPeople();
            }
        });
        this.loadBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 300,
            y: this.y + 150,
            width: 150,
            height: 30,
            text: "Load Data",
            onClick: () => {

            }
        });
        this.backBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 300,
            y: this.y + 200,
            width: 150,
            height: 30,
            text: "Back",
            onClick: () => {
                this.scene.scene.start('MainSettingScene');
            }
        });
        this.playGameBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width / 2,
            y: this.y + 260,
            width: this.width - 50,
            height: 40,
            text: "Play Game",
            onClick: () => {
                if (this.scene.mainGamePlayScene.getMapMatrix()[1]) {
                    this.scene.playSetting.setVisible(true);
                    this.scene.mainGamePlayScene.setIsPlayingMainGame(true);
                    this.editMenu.hideAllEditMenu();
                    this.playGameBtn.textInside.text = "Play Game"
                } else {
                    this.playGameBtn.textInside.text = "Can't Accept, Play Game Again"
                }
            }
        });

    }




}