import ItemDraggable from "./ItemDraggable.js";

export default class ItemEdittable extends ItemDraggable {
    constructor(data) {
        super(data);

        let labelEdit = new Phaser.GameObjects.Text(this.scene, 0, -this.height / 2 - 10, "");
        labelEdit.setOrigin(0.5, 0.5);
        labelEdit.tint = 0x222222;
        this.labelEdit = labelEdit;

        this.add(labelEdit);


        this.edittable = false;


        this.on('pointerdown', () => {
            if (this.scene.mainGamePlayScene.isPlayingMainGame) return;
            this.scene.mainGamePlayScene.setCurrentComponentEditting(this);
        });
    }

    setEdittable(canedit) {
        this.edittable = canedit;
        if (canedit) {
            this.draggable = true;
            this.labelEdit.text = "Editting....";
        } else {
            this.draggable = false;
            this.labelEdit.text = "";

        }

    }

}