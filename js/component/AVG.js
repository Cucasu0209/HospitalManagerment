import ItemEdittable from "./ItemEdittable.js";
import PeacePath from "./PeacePath.js";

export default class AVG extends ItemEdittable {
    constructor(data) {
        super(data);
        this.eye1 = new Phaser.GameObjects.Rectangle(this.scene, -this.width / 2 + 10, -this.height / 2 + 10, 10, 10, 0x000000);
        this.eye2 = new Phaser.GameObjects.Rectangle(this.scene, this.width / 2 - 10, -this.height / 2 + 10, 10, 10, 0x000000);
        this.mouth = new Phaser.GameObjects.Rectangle(this.scene, 0, this.height / 2 - 10, this.width - 10, 10, 0x000000);
        this.add([this.eye1, this.eye2, this.mouth]);
        let textInside = new Phaser.GameObjects.Text(this.scene, 0, this.height / 2 + 10, "AVG");
        textInside.setOrigin(0.5, 0.5);
        textInside.tint = 0x000000;
        this.add(textInside);

        this.isCreatingPath = false;
        this.path = [];


        this.scene.componentWantUpdate.push(this);

        this.isDrawingPath = false;

        this.scene.input.on('pointerdown', () => {
            this.isDrawingPath = true;
        });
        this.scene.input.on('pointerup', () => {
            this.isDrawingPath = false;
        });
        this.isSelfControl = false;

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

    setEdittable(canedit) {
        this.edittable = canedit;
        if (canedit) {
            if (this.isCreatingPath) {
                this.showPath();
                this.draggable = false;
                this.labelEdit.text = "Create Path....";
            } else {
                this.draggable = true;
                this.labelEdit.text = "Drag....";
            }
        } else {
            this.hidePath();
            this.draggable = false;
            this.labelEdit.text = "";

        }

    }

    lockPosition() {
        this.isCreatingPath = true;
        this.setEdittable(true);
    }
    unlockPosition() {
        this.isCreatingPath = false;
        this.setEdittable(true);
        this.clearPath();
    }

    update(time, delta) {
        if (this.edittable && this.isCreatingPath && this.isDrawingPath) {
            let mouseX = this.scene.game.input.mousePointer.x;
            let mouseY = this.scene.game.input.mousePointer.y;
            let mouseWorldX = Math.floor(mouseX / this.scene.baseSquareSize.x);
            let mouseWorldY = Math.floor(mouseY / this.scene.baseSquareSize.y);
            // console.log(mouseWorldX + " " + mouseWorldY + " " + this.getWorldX() + " " + this.getWorldY());
            this.addPath(mouseWorldX, mouseWorldY);
        }


        if (this.scene.mainGamePlayScene.isPlayingMainGame) {
            if (time > this.lastMoveTime + 1000 / this.speed) {
                if (this.isSelfControl) {
                    this.controlMove();
                } else {
                    this.movePath();
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

    addPath(_worldX, _worldY) {
        // let realX = _worldX * this.scene.baseSquareSize.x;
        // let realY = _worldY * this.scene.baseSquareSize.y;
        let worldCenterAVGX = this.x / this.scene.baseSquareSize.x;
        let worldCenterAVGY = this.y / this.scene.baseSquareSize.y;


        if (this.path.length == 0) {
            let checkhe = false;
            if (_worldX - this.getWorldX() == 0 && _worldY - this.getWorldY() == -1) checkhe = true;
            if (_worldX - this.getWorldX() == 2 && _worldY - this.getWorldY() == 0) checkhe = true;
            if (_worldX - this.getWorldX() == 1 && _worldY - this.getWorldY() == 2) checkhe = true;
            if (_worldX - this.getWorldX() == -1 && _worldY - this.getWorldY() == 1) checkhe = true;
            if (_worldX - this.getWorldX() == 1 && _worldY - this.getWorldY() == -1) checkhe = true;
            if (_worldX - this.getWorldX() == 2 && _worldY - this.getWorldY() == 1) checkhe = true;
            if (_worldX - this.getWorldX() == 0 && _worldY - this.getWorldY() == 2) checkhe = true;
            if (_worldX - this.getWorldX() == -1 && _worldY - this.getWorldY() == 0) checkhe = true;
            if (checkhe == false) return;
        }

        let dir;
        if (this.path.length >= 1) {
            // let lastWorldX = (this.path[this.path.length - 1].x + this.x) / this.scene.baseSquareSize.x;
            // let lastWorldY = (this.path[this.path.length - 1].y + this.y) / this.scene.baseSquareSize.y;
            // if (Math.abs(lastWorldX - _worldX) + Math.abs(lastWorldY - _worldY) != 1) return;

            let lastWorldX = this.path[this.path.length - 1].getWorldX() + worldCenterAVGX;
            let lastWorldY = this.path[this.path.length - 1].getWorldY() + worldCenterAVGY;
            if (Math.abs(lastWorldX - _worldX) + Math.abs(lastWorldY - _worldY) != 1) return;
            if (lastWorldX == _worldX) {
                if (lastWorldY > _worldY) {
                    dir = 'down';
                } else {
                    dir = 'up';
                }
            }
            if (lastWorldY == _worldY) {
                if (lastWorldX > _worldX) {
                    dir = 'left';
                } else {
                    dir = 'right';
                }
            }

        }

        if (this.path.length >= 2) {
            // let lastWorldX = (this.path[this.path.length - 2].x + this.x) / this.scene.baseSquareSize.x;
            // let lastWorldY = (this.path[this.path.length - 2].y + this.y) / this.scene.baseSquareSize.y;
            // if (Math.abs(lastWorldX - _worldX) + Math.abs(lastWorldY - _worldY) == 0) return;
            let last2WorldX = this.path[this.path.length - 2].getWorldX() + worldCenterAVGX;
            let last2WorldY = this.path[this.path.length - 2].getWorldY() + worldCenterAVGY;
            if (Math.abs(last2WorldX - _worldX) + Math.abs(last2WorldY - _worldY) == 0) return;
        }



        if (_worldX < this.worldLimit.x1 || _worldX >= this.worldLimit.x2 || _worldY < this.worldLimit.y1 || _worldY >= this.worldLimit.y2) {
            return
        }


        let newPoint = new PeacePath({
            scene: this.scene,
            name: 'peacepath',
            worldX: _worldX - worldCenterAVGX,
            worldY: _worldY - worldCenterAVGY,
            worldWidth: 1,
            worldHeight: 1,
            color: 0x333333,
            depth: 10,
            direction: dir
        });


        // let newPoint = new Phaser.GameObjects.Rectangle(this.scene, realX - this.x, realY - this.y, this.scene.baseSquareSize.x, this.scene.baseSquareSize.x, 0x222222).setOrigin(0)
        // newPoint.depth = 10;
        this.add(newPoint);
        this.path.push(newPoint);

    }

    clearPath() {
        for (var i = 0; i < this.path.length; i++) {
            this.path[i].setActive(false).setVisible(false);
        }
        this.path = [];
    }

    showPath() {
        for (var i = 0; i < this.path.length; i++) {
            this.path[i].setVisible(true);
        }
    }

    hidePath() {
        for (var i = 0; i < this.path.length; i++) {
            this.path[i].setVisible(false);
        }
    }

    setSelfControl(_isSelfControl) {
        this.isSelfControl = _isSelfControl;
        if (_isSelfControl)
            this.unlockPosition();
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

    rechangePathOrigin(addX, addY) {
        for (let index = 0; index < this.path.length; index++) {
            this.path[index].x += addX;
            this.path[index].y += addY;

        }
    }

    controlMove() {
        let oldX = this.x;
        let oldY = this.y;
        this.x += this.direction.x * this.scene.baseSquareSize.x;
        this.y += this.direction.y * this.scene.baseSquareSize.y;
        if (!this.checkNewPosition()) {
            this.x = oldX;
            this.y = oldY;
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