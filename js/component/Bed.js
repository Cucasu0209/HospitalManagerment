import ItemEdittable from "./ItemEdittable.js";

export default class Bed extends ItemEdittable {
    constructor(data) {
        super(data);
        this.pillow = new Phaser.GameObjects.Rectangle(this.scene, this.width / 2 - 10, 0, 10, this.height - 10, 0x2efff8);
        this.add(this.pillow)
    }
}