import ItemEdittable from "./ItemEdittable.js";


export default class Player extends ItemEdittable {
    constructor(data) {
        super(data);
        this.box1 = new Phaser.GameObjects.Rectangle(this.scene, 0, -14, 16, 12, 0x000000);
        this.box2 = new Phaser.GameObjects.Rectangle(this.scene, 0, 2, 8, 20, 0x000000);
        this.box3 = new Phaser.GameObjects.Rectangle(this.scene, -6, 14, 4, 12, 0x000000);
        this.box4 = new Phaser.GameObjects.Rectangle(this.scene, 6, 14, 4, 12, 0x000000);
        this.box5 = new Phaser.GameObjects.Rectangle(this.scene, -8, -2, 8, 4, 0x000000);
        this.box6 = new Phaser.GameObjects.Rectangle(this.scene, 8, -2, 8, 4, 0x000000);
        this.box7 = new Phaser.GameObjects.Rectangle(this.scene, -10, 2, 4, 4, 0x000000);
        this.box8 = new Phaser.GameObjects.Rectangle(this.scene, 10, 2, 4, 4, 0x000000);
        this.add([this.box1, this.box2, this.box3, this.box4, this.box5, this.box6, this.box7, this.box8])
        let playerPinpoint = new Phaser.GameObjects.Text(this.scene, 0, this.height / 2 + 10, "You");
        playerPinpoint.setOrigin(0.5, 0.5);
        playerPinpoint.tint = 0x000000;
        this.add(playerPinpoint);
    }
}