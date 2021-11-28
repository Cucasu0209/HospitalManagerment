import ItemBase from "./ItemBase.js";

export default class PeacePath extends ItemBase {
    constructor(data) {
        super(data);
        let { direction } = data;
        this.direction = direction
        this.createDirection();

        this.tag = 'path';
    }

    createDirection() {
        if (this.direction == 'down') {
            this.line = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 2, 14, 0xffffff);

            this.point1 = new Phaser.GameObjects.Rectangle(this.scene, 6, 0, 2, 2, 0xffffff);
            this.point2 = new Phaser.GameObjects.Rectangle(this.scene, -6, 0, 2, 2, 0xffffff);

            this.point3 = new Phaser.GameObjects.Rectangle(this.scene, 4, 2, 2, 2, 0xffffff);
            this.point4 = new Phaser.GameObjects.Rectangle(this.scene, -4, 2, 2, 2, 0xffffff);

            this.point5 = new Phaser.GameObjects.Rectangle(this.scene, 2, 4, 2, 2, 0xffffff);
            this.point6 = new Phaser.GameObjects.Rectangle(this.scene, -2, 4, 2, 2, 0xffffff);
            this.add([this.line, this.point1, this.point2, this.point3, this.point4, this.point5, this.point6]);

        }

        if (this.direction == 'up') {
            console.log("up");
            this.line = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 2, 14, 0xffffff);

            this.point1 = new Phaser.GameObjects.Rectangle(this.scene, 6, 0, 2, 2, 0xffffff);
            this.point2 = new Phaser.GameObjects.Rectangle(this.scene, -6, 0, 2, 2, 0xffffff);

            this.point3 = new Phaser.GameObjects.Rectangle(this.scene, 4, -2, 2, 2, 0xffffff);
            this.point4 = new Phaser.GameObjects.Rectangle(this.scene, -4, -2, 2, 2, 0xffffff);

            this.point5 = new Phaser.GameObjects.Rectangle(this.scene, 2, -4, 2, 2, 0xffffff);
            this.point6 = new Phaser.GameObjects.Rectangle(this.scene, -2, -4, 2, 2, 0xffffff);
            this.add([this.line, this.point1, this.point2, this.point3, this.point4, this.point5, this.point6]);
        }

        if (this.direction == 'right') {
            this.line = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 14, 2, 0xffffff);

            this.point1 = new Phaser.GameObjects.Rectangle(this.scene, 0, 6, 2, 2, 0xffffff);
            this.point2 = new Phaser.GameObjects.Rectangle(this.scene, 0, -6, 2, 2, 0xffffff);

            this.point3 = new Phaser.GameObjects.Rectangle(this.scene, 2, 4, 2, 2, 0xffffff);
            this.point4 = new Phaser.GameObjects.Rectangle(this.scene, 2, -4, 2, 2, 0xffffff);

            this.point5 = new Phaser.GameObjects.Rectangle(this.scene, 4, 2, 2, 2, 0xffffff);
            this.point6 = new Phaser.GameObjects.Rectangle(this.scene, 4, -2, 2, 2, 0xffffff);
            this.add([this.line, this.point1, this.point2, this.point3, this.point4, this.point5, this.point6]);
        }

        if (this.direction == 'left') {

            this.line = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 14, 2, 0xffffff);

            this.point1 = new Phaser.GameObjects.Rectangle(this.scene, 0, 6, 2, 2, 0xffffff);
            this.point2 = new Phaser.GameObjects.Rectangle(this.scene, 0, -6, 2, 2, 0xffffff);

            this.point3 = new Phaser.GameObjects.Rectangle(this.scene, -2, 4, 2, 2, 0xffffff);
            this.point4 = new Phaser.GameObjects.Rectangle(this.scene, -2, -4, 2, 2, 0xffffff);

            this.point5 = new Phaser.GameObjects.Rectangle(this.scene, -4, 2, 2, 2, 0xffffff);
            this.point6 = new Phaser.GameObjects.Rectangle(this.scene, -4, -2, 2, 2, 0xffffff);
            this.add([this.line, this.point1, this.point2, this.point3, this.point4, this.point5, this.point6]);
        }
    }

}