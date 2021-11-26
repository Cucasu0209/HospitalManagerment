export default class ButtonBase extends Phaser.GameObjects.Container {
    constructor(data) {
        let { scene, x, y, width, height, text, onClick } = data;
        let btnImg = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, 0xbbbbbb);
        let textInside = new Phaser.GameObjects.Text(scene, 0, 0, text);
        textInside.setOrigin(0.5, 0.5);
        textInside.tint = 0x000000;
        super(scene, x, y, [btnImg, textInside]);
        this.scene = scene;
        this.text = text;
        this.width = width;
        this.height = height;
        this.btnImg = btnImg;
        this.textInside = textInside;
        this.text = text;
        this.scene.add.existing(this);

        this.setSize(this.width, this.height);
        this.setInteractive();
        this.on('pointerover', () => {
            btnImg.fillColor = 0x999999;
        });
        this.on('pointerout', () => {
            btnImg.fillColor = 0xbbbbbb;
        });
        this.on('pointerdown', () => {
            btnImg.fillColor = 0x777777;
            if (onClick) onClick();
        });
    }
}