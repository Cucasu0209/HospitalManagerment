import ItemBase from "./ItemBase.js";


export default class People extends ItemBase {
    constructor(data) {
        super(data);
        // this.eye1 = new Phaser.GameObjects.Rectangle(this.scene, -this.width / 2 + 10, -this.height / 2 + 10, 10, 5, 0xffffff);
        // this.eye2 = new Phaser.GameObjects.Rectangle(this.scene, this.width / 2 - 10, -this.height / 2 + 10, 10, 5, 0xffffff);
        // this.mouth = new Phaser.GameObjects.Rectangle(this.scene, 0, this.height / 2 - 10, 5, 5, 0xffffff);
        // this.mouth1 = new Phaser.GameObjects.Rectangle(this.scene, -5, this.height / 2 - 15, 5, 5, 0xffffff);
        // this.mouth2 = new Phaser.GameObjects.Rectangle(this.scene, 5, this.height / 2 - 15, 5, 5, 0xffffff);
        // this.mouth3 = new Phaser.GameObjects.Rectangle(this.scene, -5, this.height / 2 - 10, 5, 5, 0xffffff);
        // this.mouth4 = new Phaser.GameObjects.Rectangle(this.scene, 5, this.height / 2 - 10, 5, 5, 0xffffff);
        // this.add([this.eye1, this.eye2, this.mouth, this.mouth1, this.mouth2, this.mouth3, this.mouth4]);
        this.box1 = new Phaser.GameObjects.Rectangle(this.scene, 0, -14, 16, 12, 0xffffff);
        this.box2 = new Phaser.GameObjects.Rectangle(this.scene, 0, 2, 8, 20, 0xffffff);
        this.box3 = new Phaser.GameObjects.Rectangle(this.scene, -6, 14, 4, 12, 0xffffff);
        this.box4 = new Phaser.GameObjects.Rectangle(this.scene, 6, 14, 4, 12, 0xffffff);
        this.box5 = new Phaser.GameObjects.Rectangle(this.scene, -8, -2, 8, 4, 0xffffff);
        this.box6 = new Phaser.GameObjects.Rectangle(this.scene, 8, -2, 8, 4, 0xffffff);
        this.box7 = new Phaser.GameObjects.Rectangle(this.scene, -10, 2, 4, 4, 0xffffff);
        this.box8 = new Phaser.GameObjects.Rectangle(this.scene, 10, 2, 4, 4, 0xffffff);
        this.add([this.box1, this.box2, this.box3, this.box4, this.box5, this.box6, this.box7, this.box8])
    }

    getMeObject() {
        return {
            name: this.name,
            worldX: this.getWorldX(),
            worldY: this.getWorldY(),
            worldWidth: this.worldWidth,
            worldHeight: this.worldHeight,
            color: this.color,
            depth: this.depth,
            worldLimit: {
                x1: this.worldLimit.x1,
                y1: this.worldLimit.y1,
                x2: this.worldLimit.x2,
                y2: this.worldLimit.y2
            }
        }
    }
}