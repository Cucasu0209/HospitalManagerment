import ItemEdittable from "./ItemEdittable.js";

export default class Robot extends ItemEdittable {
    constructor(data) {
        super(data);
        // this.eye1 = new Phaser.GameObjects.Rectangle(this.scene, -this.width / 2 + 10, -this.height / 2 + 10, 10, 10, 0x000000);
        // this.eye2 = new Phaser.GameObjects.Rectangle(this.scene, this.width / 2 - 10, -this.height / 2 + 10, 10, 10, 0x000000);
        // this.mouth = new Phaser.GameObjects.Rectangle(this.scene, 0, this.height / 2 - 10, this.width - 10, 10, 0x000000);
        // this.add([this.eye1, this.eye2, this.mouth]);
        // let textInside = new Phaser.GameObjects.Text(this.scene, 0, this.height / 2 + 10, "Robot");
        // textInside.setOrigin(0.5, 0.5);
        // textInside.tint = 0x000000;
        // this.add(textInside);

        let textInside = new Phaser.GameObjects.Text(this.scene, 0, 0, "F");
        textInside.setOrigin(0.5, 0.5);
        textInside.tint = 0x000000;
        this.add(textInside);
        this.tag = 'furniture';
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