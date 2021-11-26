import AVG from "./component/AVG.js";
import Bed from "./component/Bed.js";
import People from "./component/People.js";
import Player from "./component/Player.js";
import Robot from "./component/Robot.js";
import Room from "./component/Room.js";

export default class MainGamePlayScene extends Phaser.GameObjects.Container {
    constructor(data) {
        let { scene, width, height } = data;
        let body = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, 0xaaaaaa);
        body.setOrigin(0);
        super(scene, 0, 0, [body]);
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.worldLimitX = this.width / this.scene.baseSquareSize.x;
        this.worldLimitY = this.height / this.scene.baseSquareSize.y;
        this.setSize(width, height);
        this.scene.add.existing(this);

        this.componentList = [];
        this.currentComponentEditting = null;
        this.created();

        this.isPlayingMainGame = false;

        this.player = null;
    }

    created() {

    }

    createNewRoom() {
        let room = new Room({
            scene: this.scene,
            name: 'room',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 10)),
            worldY: Math.floor(Math.random() * (this.worldLimitY - 7)),
            worldWidth: 10,
            worldHeight: 7,
            color: 0xf7ff17,
            depth: 1,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: 0,
                y1: 0,
                x2: this.worldLimitX,
                y2: this.worldLimitY
            },
            roomDoorsPosition: [
                { worldX: 0, worldY: 3 },
                { worldX: 9, worldY: 1 }
            ]
        });
        this.componentList.push(room);
    }


    createNewAVG() {
        let avg = new AVG({
            scene: this.scene,
            name: 'avg',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 10)),
            worldY: Math.floor(Math.random() * (this.worldLimitY - 10)),
            worldWidth: 2,
            worldHeight: 2,
            color: 0xc058fc,
            depth: 5,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: 0,
                y1: 0,
                x2: this.worldLimitX,
                y2: this.worldLimitY
            },
        });
        this.componentList.push(avg);
    }

    createNewBed() {
        let bed = new Bed({
            scene: this.scene,
            name: 'bed',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 10)),
            worldY: Math.floor(Math.random() * (this.worldLimitY - 10)),
            worldWidth: 4,
            worldHeight: 2,
            color: 0xff2e2e,
            depth: 4,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: 0,
                y1: 0,
                x2: this.worldLimitX,
                y2: this.worldLimitY
            },
        });
        this.componentList.push(bed);
    }

    createNewRobot() {
        let robot = new Robot({
            scene: this.scene,
            name: 'robot',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 10)),
            worldY: Math.floor(Math.random() * (this.worldLimitY - 10)),
            worldWidth: 2,
            worldHeight: 2,
            color: 0x333333,
            depth: 4,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: 0,
                y1: 0,
                x2: this.worldLimitX,
                y2: this.worldLimitY
            }
        });
        this.componentList.push(robot);
    }

    createNewPlayer() {
        if (this.player != null) return;
        let player = new Player({
            scene: this.scene,
            name: 'player',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 10)),
            worldY: Math.floor(Math.random() * (this.worldLimitY - 10)),
            worldWidth: 2,
            worldHeight: 2,
            color: 0xffffff,
            depth: 4,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: 0,
                y1: 0,
                x2: this.worldLimitX,
                y2: this.worldLimitY
            }
        });
        this.player = player;
        this.componentList.push(player);
    }

    createNewPeople() {
        let people = new People({
            scene: this.scene,
            name: 'people',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 10)),
            worldY: Math.floor(Math.random() * (this.worldLimitY - 10)),
            worldWidth: 2,
            worldHeight: 2,
            color: 0x333333,
            depth: 4
        });
        this.componentList.push(people);
    }

    setCurrentComponentEditting(newComponent) {
        if (newComponent == this.currentComponentEditting) return true;

        if (this.currentComponentEditting == null && newComponent != null) {
            this.scene.mainMenu.editMenu.hideAllEditMenu();
            if (newComponent.name == 'room') {
                this.scene.mainMenu.editMenu.setRoomEditorActive(true, newComponent);
                this.currentComponentEditting = newComponent;
                this.currentComponentEditting.setEdittable(true);
            }
            if (newComponent.name == 'avg') {
                this.scene.mainMenu.editMenu.setAVGEditorActive(true, newComponent);
                this.currentComponentEditting = newComponent;
                this.currentComponentEditting.setEdittable(true);
            }
            if (newComponent.name == 'bed') {
                this.scene.mainMenu.editMenu.setBedEditorActive(true, newComponent);
                this.currentComponentEditting = newComponent;
                this.currentComponentEditting.setEdittable(true);
            }
            if (newComponent.name == 'robot') {
                this.scene.mainMenu.editMenu.setRobotEditorActive(true, newComponent);
                this.currentComponentEditting = newComponent;
                this.currentComponentEditting.setEdittable(true);
            }
            if (newComponent.name == 'player') {
                this.scene.mainMenu.editMenu.setPlayerEditorActive(true, newComponent);
                this.currentComponentEditting = newComponent;
                this.currentComponentEditting.setEdittable(true);
            }


            return true;
        } else if (newComponent == null) {

            this.currentComponentEditting.setEdittable(false);
            this.currentComponentEditting = null;
            this.scene.mainMenu.editMenu.hideAllEditMenu();

            return false;
        } else {
            return false;
        }

    }

    deleteComponent(component) {
        this.componentList = this.componentList.filter(function(ele) {
            return ele != component;
        });
        if (component == this.player) this.player = null;
        component.setActive(false).setVisible(false);
    }

    getNewRoom(width, height, oldRoom) {

        let room = new Room({
            scene: this.scene,
            name: 'room',
            worldX: oldRoom.getWorldX(),
            worldY: oldRoom.getWorldY(),
            worldWidth: width,
            worldHeight: height,
            color: 0xf7ff17,
            depth: 1,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: 0,
                y1: 0,
                x2: this.worldLimitX,
                y2: this.worldLimitY
            },
            roomDoorsPosition: oldRoom.roomDoorsPosition,
        });
        room.addRoomDoors(oldRoom.numOfDoors);
        room.addPeopleInRoom(oldRoom.numOfPeople);
        this.componentList.push(room);
        this.deleteComponent(oldRoom);
        this.currentComponentEditting = room;
        room.setEdittable(true);
        return room;
    }

    update(time, delta) {

    }


    getMapMatrix() {

        let resultMatrix = [];
        for (let i = 0; i < this.worldLimitX; i++) {
            resultMatrix.push([]);
            for (let j = 0; j < this.worldLimitY; j++) {
                resultMatrix[i].push(0);

            }
        }
        let isAccept = true;
        for (let i = 0; i < this.componentList.length; i++) {
            for (let _iw = 0; _iw < this.componentList[i].worldWidth; _iw++) {
                for (let _ih = 0; _ih < this.componentList[i].worldHeight; _ih++) {
                    let a = this.componentList[i].getWorldX() + _iw;
                    let b = this.componentList[i].getWorldY() + _ih;
                    resultMatrix[this.componentList[i].getWorldX() + _iw][this.componentList[i].getWorldY() + _ih] += 1;
                    if (resultMatrix[this.componentList[i].getWorldX() + _iw][this.componentList[i].getWorldY() + _ih] > 1) isAccept = false;
                }
            }
        }
        return [resultMatrix, isAccept];
    }

    setIsPlayingMainGame(_isplaying) {
        this.isPlayingMainGame = _isplaying;
        if (_isplaying) {
            this.setCurrentComponentEditting(null);
        }
    }
}