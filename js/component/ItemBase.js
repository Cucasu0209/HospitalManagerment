export default class ItemBase extends Phaser.GameObjects.Container {
    constructor(data) {
        let { scene, worldX, worldY, worldWidth, worldHeight, name, color, depth } = data;
        let width = worldWidth * scene.baseSquareSize.x;
        let height = worldHeight * scene.baseSquareSize.y;
        let x = worldX * scene.baseSquareSize.x + width / 2;
        let y = worldY * scene.baseSquareSize.y + height / 2;


        let itemBody = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, color);

        super(scene, x, y, [itemBody]);

        this.scene = scene;
        this.depth = depth;
        this.name = name;
        this.itemBody = itemBody;
        this.width = width;
        this.height = height;

        this.worldX = worldX;
        this.worldY = worldY;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.color = color;

        this.setSize(this.width, this.height);

        this.scene.add.existing(this);
    }

    setWorldWidth(newWidth) {
        this.worldWidth = newWidth;
        this.worldX = this.x - newWidth * this.scene.baseSquareSize.x / 2;

        let newRealWidth = newWidth * this.scene.baseSquareSize.x;

        this.setSize(newRealWidth, this.height);
        this.itemBody.setActive(false).setVisible(false);

        let newBody = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, newRealWidth, this.height, this.color);
        this.add(newBody);
        this.itemBody = newBody;
    }

    setWorldHeight(newHeight) {
        this.worldHeight = newHeight;
        this.worldY = this.y - newHeight * this.scene.baseSquareSize.y / 2;

        let newRealHeight = newHeight * this.scene.baseSquareSize.y;

        this.setSize(this.width, newRealHeight);
        this.itemBody.setActive(false).setVisible(false);

        let newBody = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, this.width, newRealHeight, this.color);
        this.add(newBody);
        this.itemBody = newBody;
    }

    getWorldX() {
        this.worldX = (this.x - this.width / 2) / this.scene.baseSquareSize.x;
        return this.worldX;
    }
    getWorldY() {
        this.worldY = (this.y - this.height / 2) / this.scene.baseSquareSize.y;
        return this.worldY;
    }

}