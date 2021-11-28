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
        this.box1 = new Phaser.GameObjects.Rectangle(this.scene, 0, -7, 8, 6, 0xffffff);
        this.box2 = new Phaser.GameObjects.Rectangle(this.scene, 0, 1, 4, 10, 0xffffff);
        this.box3 = new Phaser.GameObjects.Rectangle(this.scene, -3, 7, 2, 6, 0xffffff);
        this.box4 = new Phaser.GameObjects.Rectangle(this.scene, 3, 7, 2, 6, 0xffffff);
        this.box5 = new Phaser.GameObjects.Rectangle(this.scene, -4, -1, 4, 2, 0xffffff);
        this.box6 = new Phaser.GameObjects.Rectangle(this.scene, 4, -1, 4, 2, 0xffffff);
        this.box7 = new Phaser.GameObjects.Rectangle(this.scene, -5, 1, 2, 2, 0xffffff);
        this.box8 = new Phaser.GameObjects.Rectangle(this.scene, 5, 1, 2, 2, 0xffffff);
        this.add([this.box1, this.box2, this.box3, this.box4, this.box5, this.box6, this.box7, this.box8])

        this.tag = 'people';
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