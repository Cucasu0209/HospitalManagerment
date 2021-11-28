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

        this.scene.componentWantUpdate.push(this);

        this.speed = 10;
        this.direction = Phaser.Math.Vector2.ZERO;
        this.isRunning = true;
        this.lastMoveTime = 0;
        this.moveInterval = 200;

        this.scene.input.keyboard.on('keydown', e => {
            this.keydown(e);
        });
        this.scene.input.keyboard.on('keyup', e => {
            this.keyup(e);
        })

        this.tag = 'people';
    }
    keydown(e) {
        console.log(e.key);
        switch (e.key) {
            case 'ArrowLeft':
                this.direction = Phaser.Math.Vector2.LEFT;
                break;
            case 'ArrowUp':
                this.direction = Phaser.Math.Vector2.UP;
                break;
            case 'ArrowRight':
                this.direction = Phaser.Math.Vector2.RIGHT;
                break;
            case 'ArrowDown':
                this.direction = Phaser.Math.Vector2.DOWN;
                break;
        }
    }

    keyup(e) {

        switch (e.key) {
            case 'ArrowLeft':
                if (this.direction == Phaser.Math.Vector2.LEFT) this.direction = Phaser.Math.Vector2.ZERO;
                break;
            case 'ArrowUp':
                if (this.direction == Phaser.Math.Vector2.UP) this.direction = Phaser.Math.Vector2.ZERO;
                break;
            case 'ArrowRight':
                if (this.direction == Phaser.Math.Vector2.RIGHT) this.direction = Phaser.Math.Vector2.ZERO;
                break;
            case 'ArrowDown':
                if (this.direction == Phaser.Math.Vector2.DOWN) this.direction = Phaser.Math.Vector2.ZERO;
                break;
        }
    }

    update(time, delta) {
        if (this.scene.mainGamePlayScene.isPlayingMainGame) {
            if (time > this.lastMoveTime + 1000 / this.speed) {
                let oldX = this.x;
                let oldY = this.y;
                this.x += this.direction.x * this.scene.baseSquareSize.x;
                this.y += this.direction.y * this.scene.baseSquareSize.y;
                if (!this.checkNewPosition()) {
                    this.x = oldX;
                    this.y = oldY;
                }
                this.lastMoveTime = time;
            }


        }
    }
    checkNewPosition() {
        //clamp
        if (this.getWorldX() < this.worldLimit.x1) return false;
        if (this.getWorldY() < this.worldLimit.y1) return false;
        if (this.getWorldX() + this.worldWidth > this.worldLimit.x2) return false;
        if (this.getWorldY() + this.worldHeight > this.worldLimit.y2) return false;
        if (!this.scene.mainGamePlayScene.getMapMatrix()[1]) return false;
        return true;
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