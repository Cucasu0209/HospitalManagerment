import ItemEdittable from "./ItemEdittable.js";
import PeacePath from "./PeacePath.js";

export default class Road extends ItemEdittable {
    constructor(data) {
        super(data);
        let { direction } = data;
        this.direction = direction;
        this.path = [];
        this.createPeathPath();

        this.tag = 'path';
        this.depth = 899
    }

    createPeathPath() {
        if (this.direction == 'right' || this.direction == 'left') {
            for (let i = 0; i < this.worldWidth; i++) {
                let newPoint = new PeacePath({
                    scene: this.scene,
                    name: 'peacepath',
                    worldX: -this.worldWidth / 2 + i,
                    worldY: -this.worldHeight / 2,
                    worldWidth: 1,
                    worldHeight: 1,
                    color: 0x333333,
                    depth: 900,
                    direction: this.direction
                });
                this.add(newPoint);
                this.path.push(newPoint);
            }
        }
        if (this.direction == 'down' || this.direction == 'up') {
            for (let i = 0; i < this.worldHeight; i++) {
                let newPoint = new PeacePath({
                    scene: this.scene,
                    name: 'peacepath',
                    worldX: -this.worldWidth / 2,
                    worldY: -this.worldHeight / 2 + i,
                    worldWidth: 1,
                    worldHeight: 1,
                    color: 0x333333,
                    depth: 900,
                    direction: this.direction
                });
                this.add(newPoint);
                this.path.push(newPoint);
            }
        }

    }

    clearPath() {
        for (var i = 0; i < this.path.length; i++) {
            this.path[i].setActive(false).setVisible(false);
        }
        this.path = [];
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
            },
            direction: this.direction
        }
    }

    getLength() {
        return this.worldWidth > this.worldHeight ? this.worldWidth : this.worldHeight;
    }
}