import ItemBase from "./ItemBase.js";

export default class AGV extends ItemBase {
    constructor(data) {
        super(data);
        let textInside = new Phaser.GameObjects.Text(this.scene, 0, 0, "AGV");
        textInside.setOrigin(0.5, 0.5);
        textInside.displayWidth /= 2;
        textInside.displayHeight /= 2;
        textInside.tint = 0x000000;
        this.add(textInside);
        this.depth = 1001

        this.scene.componentWantUpdate.push(this);


        this.isSelfControl = true;

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
        this.tag = 'robot';
        this.setInteractive();
        this.on('pointerdown', () => {
            if (!this.scene.mainGamePlayScene.isPlayingMainGame) return;
            this.scene.mainGamePlayScene.setCurrentAGVControlling(this);

        });
    }

    keydown(e) {
        switch (e.key) {
            case 'a':
                this.direction = Phaser.Math.Vector2.LEFT;
                break;
            case 'w':
                this.direction = Phaser.Math.Vector2.UP;
                break;
            case 'd':
                this.direction = Phaser.Math.Vector2.RIGHT;
                break;
            case 's':
                this.direction = Phaser.Math.Vector2.DOWN;
                break;
        }
    }

    keyup(e) {

        switch (e.key) {
            case 'a':
                if (this.direction == Phaser.Math.Vector2.LEFT) this.direction = Phaser.Math.Vector2.ZERO;
                break;
            case 'w':
                if (this.direction == Phaser.Math.Vector2.UP) this.direction = Phaser.Math.Vector2.ZERO;
                break;
            case 'd':
                if (this.direction == Phaser.Math.Vector2.RIGHT) this.direction = Phaser.Math.Vector2.ZERO;
                break;
            case 's':
                if (this.direction == Phaser.Math.Vector2.DOWN) this.direction = Phaser.Math.Vector2.ZERO;
                break;
        }
    }

    update(time, delta) {

        if (this.scene.mainGamePlayScene.isPlayingMainGame) {
            if (time > this.lastMoveTime + 1000 / this.speed) {
                if (this.scene.mainGamePlayScene.currentAGVControlling == this) {
                    this.controlMove();
                } else {
                    // this.movePath();
                }
                this.lastMoveTime = time;
            }

        }
    }

    movePath() {
        //
        if (this.path.length == 0) return;
        // console.log(this.path[0].x + "   " + this.path[0].y);
        let oldX = this.x;
        let oldY = this.y;
        this.x += this.path[0].x - this.path[0].width / 2;
        this.y += this.path[0].y - this.path[0].height / 2;
        console.log(this.x + "   " + this.y);
        if (!this.checkNewPosition()) {
            this.x = oldX;
            this.y = oldY;
        } else {
            this.rechangePathOrigin(oldX - this.x, oldY - this.y);
            this.path.shift();
        }
    }

    controlMove() {
        if (this.direction == Phaser.Math.Vector2.ZERO) return;
        let newWorldX = this.getWorldX() + this.direction.x;
        let newWorldY = this.getWorldY() + this.direction.y;

        if (this.checkNewPosition(newWorldX, newWorldY)) {
            let oldX = this.x;
            let oldY = this.y;
            this.x += this.direction.x * this.scene.baseSquareSize.x;
            this.y += this.direction.y * this.scene.baseSquareSize.y;
            if (!this.scene.mainGamePlayScene.getMapMatrix()[1]) {
                this.x = oldX;
                this.y = oldY;
            }
        }
    }

    checkNewPosition(newWorldX, newWorldY) {
        //clamp
        let canMove = false;
        let listCanMove = this.scene.mainGamePlayScene.getAGVRoadMatrix();
        listCanMove = listCanMove[this.getWorldX()][this.getWorldY()];
        console.log(this.getWorldX() + " " + this.getWorldY() + " " + listCanMove);
        for (let index = 0; index < listCanMove.length; index++) {
            console.log(this.getWorldX() + " " + this.getWorldY() + " " + listCanMove[index].x + " " + listCanMove[index].y);
            if (listCanMove[index].x == newWorldX && listCanMove[index].y == newWorldY) {
                return true;
            }
        }
        return canMove;
    }

}