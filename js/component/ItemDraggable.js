import ItemBase from "./ItemBase.js";

export default class ItemDraggable extends ItemBase {
    constructor(data) {
        let { ondragend, worldLimit } = data;
        super(data);
        this.originalX = this.x;
        this.originalY = this.y;
        this.draggable = false;
        this.dragging = false;
        this.worldLimit = worldLimit;
        this.ondragend = ondragend;

        this.setInteractive();
        this.scene.input.setDraggable(this);
        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (!gameObject.draggable) return;
            gameObject.dragging = true;
            let newX = Math.floor(dragX / gameObject.scene.baseSquareSize.x) * gameObject.scene.baseSquareSize.x + gameObject.x % gameObject.scene.baseSquareSize.x;
            let newY = Math.floor(dragY / gameObject.scene.baseSquareSize.y) * gameObject.scene.baseSquareSize.y + gameObject.y % gameObject.scene.baseSquareSize.y;

            //clamp
            if (newY - gameObject.height / 2 >= worldLimit.y1 * gameObject.scene.baseSquareSize.y) {
                if (newY + gameObject.height / 2 <= worldLimit.y2 * gameObject.scene.baseSquareSize.y) {
                    gameObject.y = newY;
                }
            }
            if (newX - gameObject.width / 2 >= worldLimit.x1 * gameObject.scene.baseSquareSize.x) {
                if (newX + gameObject.width / 2 <= worldLimit.x2 * gameObject.scene.baseSquareSize.x) {
                    gameObject.x = newX;
                }
            }
        });
        this.scene.input.on('dragend', (pointer, gameObject) => {
            this.dragging = false;
            gameObject.ondragend(pointer, gameObject);
        })
    }


}