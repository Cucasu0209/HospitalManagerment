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