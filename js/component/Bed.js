import ItemEdittable from "./ItemEdittable.js";

export default class Bed extends ItemEdittable {
    constructor(data) {
        super(data);
        this.pillow = new Phaser.GameObjects.Rectangle(this.scene, this.width / 2 - 10, 0, 10, this.height - 10, 0x2efff8);
        this.add(this.pillow)
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