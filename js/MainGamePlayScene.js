import AVG from "./component/AVG.js";
import Road from "./component/Road.js";
import People from "./component/People.js";
import Robot from "./component/Robot.js";
import Room from "./component/Room.js";
import Gate from "./component/Gate.js";
import Elevator from "./component/Elevator.js";
import AGV from "./component/AGV.js";

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
        this.currentAGVControlling = null;

        this.avgList = [];

    }

    created() {
        this.createNewGate();
        this.createNewElevator();
    }

    createNewGate() {
        let gate = new Gate({
            scene: this.scene,
            name: 'gate',
            worldX: 0,
            worldY: 0,
            worldWidth: 2,
            worldHeight: 2,
            color: 0x0000ff,
            depth: 1
        });
        let gate1 = new Gate({
            scene: this.scene,
            name: 'gate',
            worldX: this.worldLimitX - 2,
            worldY: 0,
            worldWidth: 2,
            worldHeight: 2,
            color: 0x0000ff,
            depth: 1
        });
        let gate2 = new Gate({
            scene: this.scene,
            name: 'gate',
            worldX: 0,
            worldY: this.worldLimitY - 2,
            worldWidth: 2,
            worldHeight: 2,
            color: 0x0000ff,
            depth: 1
        });
        let gate3 = new Gate({
            scene: this.scene,
            name: 'gate',
            worldX: this.worldLimitX - 2,
            worldY: this.worldLimitY - 2,
            worldWidth: 2,
            worldHeight: 2,
            color: 0x0000ff,
            depth: 1
        });
        this.componentList.push(gate);
        this.componentList.push(gate1);
        this.componentList.push(gate2);
        this.componentList.push(gate3);
    }

    createNewElevator() {
        let elevator = new Elevator({
            scene: this.scene,
            name: 'elevator',
            worldX: 0,
            worldY: this.worldLimitY / 2 - 3,
            worldWidth: 4,
            worldHeight: 6,
            color: 0x00ff00,
            depth: 1
        });
        let elevator1 = new Elevator({
            scene: this.scene,
            name: 'elevator',
            worldX: this.worldLimitX - 4,
            worldY: this.worldLimitY / 2 - 3,
            worldWidth: 4,
            worldHeight: 6,
            color: 0x00ff00,
            depth: 1
        });
        this.componentList.push(elevator);
        this.componentList.push(elevator1);
    }

    createNewRoom() {
        let room = new Room({
            scene: this.scene,
            name: 'room',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 20)) + 10,
            worldY: Math.floor(Math.random() * (this.worldLimitY - 20)) + 10,
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

    createNewAGV() {
        // if (this.avgList.length >= 24) return
        // let agv = new AGV({
        //     scene: this.scene,
        //     name: 'agv',
        //     worldX: this.avgList.length % 4,
        //     worldY: this.worldLimitY / 2 - 3 + Math.floor(this.avgList.length / 4),
        //     worldWidth: 1,
        //     worldHeight: 1,
        //     color: 0xc058fc,
        //     depth: 5
        // });

        if (this.avgList.length >= 6) return
        let agv = new AGV({
            scene: this.scene,
            name: 'agv',
            worldX: (this.avgList.length % 2) * 2,
            worldY: this.worldLimitY / 2 - 3 + Math.floor(this.avgList.length / 2) * 2,
            worldWidth: 1,
            worldHeight: 1,
            color: 0xc058fc,
            depth: 5
        });
        this.avgList.push(agv);
        this.componentList.push(agv);
    }

    deleteNewAGV() {
        if (this.avgList.length < 1) return
        this.deleteComponent(this.avgList[this.avgList.length - 1]);
    }

    createNewRoad() {
        let road = new Road({
            scene: this.scene,
            name: 'road',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 20)) + 10,
            worldY: Math.floor(Math.random() * (this.worldLimitY - 20)) + 10,
            worldWidth: 1,
            worldHeight: 1,
            color: 0x000000,
            depth: 4,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: 0,
                y1: 0,
                x2: this.worldLimitX,
                y2: this.worldLimitY
            },
            direction: 'right',
        });
        this.componentList.push(road);
    }

    createNewRobot() {
        let robot = new Robot({
            scene: this.scene,
            name: 'robot',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 20)) + 10,
            worldY: Math.floor(Math.random() * (this.worldLimitY - 20)) + 10,
            worldWidth: Math.floor(Math.random() * 2) + 1,
            worldHeight: Math.floor(Math.random() * 2) + 1,
            color: Math.floor(Math.random() * 0xffffff),
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


    createNewPeople() {
        let people = new People({
            scene: this.scene,
            name: 'people',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 10)),
            worldY: Math.floor(Math.random() * (this.worldLimitY - 10)),
            worldWidth: 1,
            worldHeight: 1,
            color: 0x333333,
            depth: 4
        });
        this.componentList.push(people);
    }

    createRandomTheFinishPoint() {

    }



    createNewRoomWithInfo(info) {
        let room = new Room({
            scene: this.scene,
            name: info.name,
            worldX: info.worldX,
            worldY: info.worldY,
            worldWidth: info.worldWidth,
            worldHeight: info.worldHeight,
            color: info.color,
            depth: info.depth,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: info.worldLimit.x1,
                y1: info.worldLimit.y1,
                x2: info.worldLimit.x2,
                y2: info.worldLimit.y2
            }
        });
        room.addRoomDoors(info.numberOfDoor);
        room.addPeopleInRoom(info.numberOfPeople)
        this.componentList.push(room);
    }


    createNewAVGWithInfo(info) {
        let avg = new AVG({
            scene: this.scene,
            name: info.name,
            worldX: info.worldX,
            worldY: info.worldY,
            worldWidth: info.worldWidth,
            worldHeight: info.worldHeight,
            color: info.color,
            depth: info.depth,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: info.worldLimit.x1,
                y1: info.worldLimit.y1,
                x2: info.worldLimit.x2,
                y2: info.worldLimit.y2
            }
        });
        this.componentList.push(avg);
    }

    createNewRoadWithInfo(info) {
        let road = new Road({
            scene: this.scene,
            name: info.name,
            worldX: info.worldX,
            worldY: info.worldY,
            worldWidth: info.worldWidth,
            worldHeight: info.worldHeight,
            color: info.color,
            depth: info.depth,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: info.worldLimit.x1,
                y1: info.worldLimit.y1,
                x2: info.worldLimit.x2,
                y2: info.worldLimit.y2
            },
            direction: info.direction
        });
        this.componentList.push(road);
    }

    createNewRobotWithInfo(info) {
        let robot = new Robot({
            scene: this.scene,
            name: info.name,
            worldX: info.worldX,
            worldY: info.worldY,
            worldWidth: info.worldWidth,
            worldHeight: info.worldHeight,
            color: info.color,
            depth: info.depth,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: info.worldLimit.x1,
                y1: info.worldLimit.y1,
                x2: info.worldLimit.x2,
                y2: info.worldLimit.y2
            }
        });
        this.componentList.push(robot);
    }

    createNewAGVWithInfo(info) {
        if (this.avgList.length > 24) return
        let agv = new AGV({
            scene: this.scene,
            name: info.name,
            worldX: info.worldX,
            worldY: info.worldY,
            worldWidth: info.worldWidth,
            worldHeight: info.worldHeight,
            color: info.color,
            depth: info.depth,
        });
        this.avgList.push(agv);
        this.componentList.push(agv);
    }

    createNewElevatorWothInfo(info) {
        let elevator = new Elevator({
            scene: this.scene,
            name: info.name,
            worldX: info.worldX,
            worldY: info.worldY,
            worldWidth: info.worldWidth,
            worldHeight: info.worldHeight,
            color: info.color,
            depth: info.depth,
        });
        this.componentList.push(elevator);
    }

    createNewGateWothInfo(info) {
        let gate = new Gate({
            scene: this.scene,
            name: info.name,
            worldX: info.worldX,
            worldY: info.worldY,
            worldWidth: info.worldWidth,
            worldHeight: info.worldHeight,
            color: info.color,
            depth: info.depth,
        });
        this.componentList.push(gate);
    }

    createNewPeople() {
        let people = new People({
            scene: this.scene,
            name: 'people',
            worldX: Math.floor(Math.random() * (this.worldLimitX - 10)),
            worldY: Math.floor(Math.random() * (this.worldLimitY - 10)),
            worldWidth: 1,
            worldHeight: 1,
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
            if (newComponent.name == 'road') {
                this.scene.mainMenu.editMenu.setRoadEditorActive(true, newComponent);
                this.currentComponentEditting = newComponent;
                this.currentComponentEditting.setEdittable(true);
            }
            if (newComponent.name == 'robot') {
                this.scene.mainMenu.editMenu.setRobotEditorActive(true, newComponent);
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

    setCurrentAGVControlling(agv) {
        this.currentAGVControlling = agv;
    }

    deleteComponent(component) {
        this.componentList = this.componentList.filter(function(ele) {
            return ele != component;
        });
        this.avgList = this.avgList.filter(function(ele) {
            return ele != component;
        });
        component.setActive(false).setVisible(false);
    }

    deleteAllComponent() {
        this.componentList = this.componentList.filter(function(ele) {
            ele.setActive(false).setVisible(false);
            return false;
        });
        this.avgList = [];
    }

    getNewRoom(width, height, oldRoom) {

        let room = new Room({
            scene: this.scene,
            name: 'room',
            worldX: oldRoom.getWorldX(),
            worldY: oldRoom.getWorldY(),
            worldWidth: width,
            worldHeight: height,
            color: oldRoom.color,
            depth: oldRoom.depth,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: oldRoom.worldLimit.x1,
                y1: oldRoom.worldLimit.y1,
                x2: oldRoom.worldLimit.x2,
                y2: oldRoom.worldLimit.y2
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

    getNewRoad(direction, length, oldRoad) {
        let newWidth = 1,
            newHeight = 1;


        if (length <= 1) length = 1;
        if (direction == 'right' || direction == 'left') {
            if (length + oldRoad.getWorldX() >= oldRoad.worldLimit.x2) length = oldRoad.worldLimit.x2 - oldRoad.getWorldX();
        }
        if (direction == 'up' || direction == 'down') {
            if (length + oldRoad.getWorldY() >= oldRoad.worldLimit.y2) length = oldRoad.worldLimit.y2 - oldRoad.getWorldY();
        }

        if (direction == 'right' || direction == 'left') {
            newWidth = length;
            newHeight = 1;
        }
        if (direction == 'up' || direction == 'down') {
            newWidth = 1;
            newHeight = length;
        }

        let road = new Road({
            scene: this.scene,
            name: 'road',
            worldX: oldRoad.getWorldX(),
            worldY: oldRoad.getWorldY(),
            worldWidth: newWidth,
            worldHeight: newHeight,
            color: oldRoad.color,
            depth: oldRoad.depth,
            ondragend: (pointer, gameObject) => {

            },
            worldLimit: {
                x1: oldRoad.worldLimit.x1,
                y1: oldRoad.worldLimit.y1,
                x2: oldRoad.worldLimit.x2,
                y2: oldRoad.worldLimit.y2
            },
            direction: direction
        });

        this.componentList.push(road);
        this.deleteComponent(oldRoad);
        this.currentComponentEditting = road;
        road.setEdittable(true);
        return road;
    }

    update(time, delta) {

    }


    getMapMatrix() {
        // [1-9] will be for path 1-up, 2-right, 3-down, 4 -left, 5-elevator
        // [1-9]*10 will be furniture
        // [1-9]*100 will be robot or people
        let resultMatrix = [];
        for (let i = 0; i < this.worldLimitX; i++) {
            resultMatrix.push([]);
            for (let j = 0; j < this.worldLimitY; j++) {
                resultMatrix[i].push([]);

            }
        }
        let isAccept = true;
        for (let i = 0; i < this.componentList.length; i++) {
            for (let _iw = 0; _iw < this.componentList[i].worldWidth; _iw++) {
                for (let _ih = 0; _ih < this.componentList[i].worldHeight; _ih++) {
                    let a = this.componentList[i].getWorldX() + _iw;
                    let b = this.componentList[i].getWorldY() + _ih;
                    let numberAdd = null;

                    if (this.componentList[i].tag == 'path') {
                        if (this.componentList[i].direction == 'up') numberAdd = 1;
                        else if (this.componentList[i].direction == 'right') numberAdd = 2;
                        else if (this.componentList[i].direction == 'down') numberAdd = 3;
                        else if (this.componentList[i].direction == 'left') numberAdd = 4;
                        else numberAdd = 5;
                    }
                    if (this.componentList[i].tag == 'furniture') {
                        numberAdd = 10;
                    }
                    if (this.componentList[i].tag == 'people') {
                        numberAdd = 100;
                    }
                    if (this.componentList[i].tag == 'robot') {
                        numberAdd = 100;
                    }
                    if (numberAdd != null) {
                        resultMatrix[a][b].push(numberAdd);
                    }

                }
            }
        }
        //validate
        for (let a = 0; a < this.worldLimitX; a++) {
            for (let b = 0; b < this.worldLimitY; b++) {
                let hasFurniture = false;
                let hasPath = false;
                let hasPeople = false;
                for (let index = 0; index < resultMatrix[a][b].length; index++) {
                    if (resultMatrix[a][b][index] < 10) {
                        if (hasFurniture) {
                            isAccept = false;
                            break;
                        }
                        hasPath = true;
                        if (a <= 0 || b <= 0 ||
                            a >= this.worldLimitX - 1 || b >= this.worldLimitY - 1) {
                            if (resultMatrix[a][b][index] == 5) {

                            } else {
                                isAccept = false;
                                break;
                            }
                        }
                        for (let _rx = -1; _rx <= 1; _rx++) {
                            if (a + _rx >= 0 && a + _rx <= this.worldLimitX - 1) {
                                for (let _ry = -1; _ry <= 1; _ry++) {
                                    if (b + _ry >= 0 && b + _ry <= this.worldLimitY - 1) {
                                        for (let _ri = 0; _ri <
                                            resultMatrix[a + _rx][b + _ry].length; _ri++) {
                                            if (resultMatrix[a + _rx][b + _ry][_ri] < 100 &&
                                                resultMatrix[a + _rx][b + _ry][_ri] >= 10) {
                                                isAccept = false;
                                                break;
                                            }
                                        }
                                    }

                                }
                            }

                        }

                    } else if (resultMatrix[a][b][index] < 100) {
                        if (hasFurniture) {
                            isAccept = false;
                            break;
                        }
                        if (hasPath) {
                            isAccept = false;
                            break;
                        }
                        hasFurniture = true;
                    } else if (resultMatrix[a][b][index] < 1000) {
                        if (hasPeople) {
                            isAccept = false;
                            break;
                        }
                        hasPeople = true;
                    }
                }
            }
        }


        return [resultMatrix, isAccept];
    }

    getAGVRoadMatrix() {
        let result = this.getMapMatrix();
        if (result[1] == false) return null;
        let resultMatrix = result[0];

        let newMatrix = [];
        for (let i = 0; i < this.worldLimitX; i++) {
            newMatrix.push([]);
            for (let j = 0; j < this.worldLimitY; j++) {
                newMatrix[i].push([]);

            }
        }

        for (let i = 0; i < this.worldLimitX; i++) {
            for (let j = 0; j < this.worldLimitY; j++) {
                for (let index = 0; index < resultMatrix[i][j].length; index++) {
                    if (resultMatrix[i][j][index] < 10 && resultMatrix[i][j][index] > 0) {
                        if (i - 1 >= 0) {
                            //left
                            for (let _index = 0; _index < resultMatrix[i - 1][j].length; _index++) {
                                if (resultMatrix[i - 1][j][_index] < 10 || resultMatrix[i - 1][j][_index] > 0) {
                                    // console.log("passup " + resultMatrix[i - 1][j][_index] + " " + resultMatrix[i][j][index]);

                                    if (resultMatrix[i - 1][j][_index] == 5 && resultMatrix[i][j][index] == 5) {
                                        // console.log(i + " " + j + "haha");
                                        newMatrix[i][j].push({ y: j, x: i - 1 });
                                        break;
                                    }
                                    if (resultMatrix[i - 1][j][_index] == 4) {
                                        newMatrix[i][j].push({ y: j, x: i - 1 });
                                        break;
                                    }
                                    if (resultMatrix[i][j][index] == 4) {
                                        newMatrix[i][j].push({ y: j, x: i - 1 });
                                        break;
                                    }
                                }
                            }

                        }
                        if (j - 1 >= 0) {
                            //up
                            for (let _index = 0; _index < resultMatrix[i][j - 1].length; _index++) {
                                if (resultMatrix[i][j - 1][_index] < 10 || resultMatrix[i][j - 1][_index] > 0) {
                                    // console.log("passleft");
                                    if (resultMatrix[i][j - 1][_index] == 5 && resultMatrix[i][j][index] == 5) {
                                        newMatrix[i][j].push({ y: j - 1, x: i });
                                        break;
                                    }
                                    if (resultMatrix[i][j - 1][_index] == 1) {
                                        newMatrix[i][j].push({ y: j - 1, x: i });
                                        break;
                                    }
                                    if (resultMatrix[i][j][index] == 1) {
                                        newMatrix[i][j].push({ y: j - 1, x: i });
                                        break;
                                    }
                                }
                            }

                        }
                        if (i + 1 <= this.worldLimitX - 1) {
                            //right
                            for (let _index = 0; _index < resultMatrix[i + 1][j].length; _index++) {
                                if (resultMatrix[i + 1][j][_index] < 10 || resultMatrix[i + 1][j][_index] > 0) {
                                    // console.log("passdown");
                                    if (resultMatrix[i + 1][j][_index] == 5 && resultMatrix[i][j][index] == 5) {

                                        newMatrix[i][j].push({ y: j, x: i + 1 });
                                        break;
                                    }
                                    if (resultMatrix[i + 1][j][_index] == 2) {
                                        newMatrix[i][j].push({ y: j, x: i + 1 });
                                        break;
                                    }
                                    if (resultMatrix[i][j][index] == 2) {
                                        newMatrix[i][j].push({ y: j, x: i + 1 });
                                        break;
                                    }
                                }
                            }
                        }
                        if (j + 1 <= this.worldLimitY - 1) {
                            //down
                            for (let _index = 0; _index < resultMatrix[i][j + 1].length; _index++) {
                                if (resultMatrix[i][j + 1][_index] < 10 || resultMatrix[i][j + 1][_index] > 0) {
                                    // console.log("passright");
                                    if (resultMatrix[i][j + 1][_index] == 5 && resultMatrix[i][j][index] == 5) {
                                        newMatrix[i][j].push({ y: j + 1, x: i });
                                        break;
                                    }
                                    if (resultMatrix[i][j + 1][_index] == 3) {
                                        newMatrix[i][j].push({ y: j + 1, x: i });
                                        break;
                                    }
                                    if (resultMatrix[i][j][index] == 3) {
                                        newMatrix[i][j].push({ y: j + 1, x: i });
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return newMatrix;
    }

    setIsPlayingMainGame(_isplaying) {
        this.isPlayingMainGame = _isplaying;
        if (_isplaying) {
            this.setCurrentComponentEditting(null);
        }
    }

    getArrConponentData() {
        let arr = []
        for (let index = 0; index < this.componentList.length; index++) {
            arr.push(this.componentList[index].getMeObject());
        }
        return arr;
    }

    getArrConponentDataString() {
        return JSON.stringify(this.getArrConponentData());
    }

    getDataFromStringJson(strData) {
        if (!strData || strData == "") return null;
        return JSON.parse(strData);
    }

    saveData() {
        this.writeFileData(this.getArrConponentDataString());
    }

    loadData() {
        this.setCurrentComponentEditting(null);
        this.drawComponentByData(this.getDataFromStringJson(this.readFileData()));
    }

    drawComponentByData(dataListObj) {
        this.deleteAllComponent();
        if (dataListObj == null) return;
        for (let i = 0; i < dataListObj.length; i++) {
            let obj = dataListObj[i];
            if (obj.name == 'avg') this.createNewAVGWithInfo(obj);
            if (obj.name == 'room') this.createNewRoomWithInfo(obj);
            if (obj.name == 'road') this.createNewRoadWithInfo(obj);
            if (obj.name == 'robot') this.createNewRobotWithInfo(obj);
            if (obj.name == 'gate') this.createNewGateWothInfo(obj);
            if (obj.name == 'elevator') this.createNewElevatorWothInfo(obj);
            if (obj.name == 'agv') this.createNewAGVWithInfo(obj);
        }
    }

    writeFileData(data) {
        console.log(data);
        this.scene.game.data = data;
    }

    readFileData() {
        if (this.scene.game.data == null || this.scene.game.data == '') {
            this.scene.game.data = '[{"name":"gate","worldX":0,"worldY":0,"worldWidth":2,"worldHeight":2,"color":255,"depth":1},{"name":"gate","worldX":45,"worldY":0,"worldWidth":2,"worldHeight":2,"color":255,"depth":1},{"name":"gate","worldX":0,"worldY":30,"worldWidth":2,"worldHeight":2,"color":255,"depth":1},{"name":"gate","worldX":45,"worldY":30,"worldWidth":2,"worldHeight":2,"color":255,"depth":1},{"name":"elevator","worldX":0,"worldY":13,"worldWidth":4,"worldHeight":6,"color":65280,"depth":1000},{"name":"elevator","worldX":43,"worldY":13,"worldWidth":4,"worldHeight":6,"color":65280,"depth":1000},{"name":"agv","worldX":0,"worldY":13,"worldWidth":1,"worldHeight":1,"color":12605692,"depth":1001},{"name":"agv","worldX":45,"worldY":16,"worldWidth":1,"worldHeight":1,"color":12605692,"depth":1001},{"name":"room","worldX":9,"worldY":6,"worldWidth":9,"worldHeight":5,"color":16252695,"depth":1,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"numberOfPeople":1,"numberOfDoor":2},{"name":"room","worldX":24,"worldY":3,"worldWidth":15,"worldHeight":9,"color":16252695,"depth":1,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"numberOfPeople":2,"numberOfDoor":3},{"name":"room","worldX":8,"worldY":22,"worldWidth":10,"worldHeight":7,"color":16252695,"depth":1,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"numberOfPeople":2,"numberOfDoor":2},{"name":"robot","worldX":15,"worldY":21,"worldWidth":2,"worldHeight":1,"color":2824537,"depth":4,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32}},{"name":"robot","worldX":14,"worldY":5,"worldWidth":2,"worldHeight":1,"color":15784381,"depth":4,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32}},{"name":"robot","worldX":24,"worldY":23,"worldWidth":2,"worldHeight":2,"color":2696914,"depth":4,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32}},{"name":"room","worldX":26,"worldY":21,"worldWidth":11,"worldHeight":8,"color":16252695,"depth":1,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"numberOfPeople":0,"numberOfDoor":3},{"name":"robot","worldX":37,"worldY":24,"worldWidth":1,"worldHeight":2,"color":11297135,"depth":4,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32}},{"name":"road","worldX":6,"worldY":30,"worldWidth":35,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"right"},{"name":"road","worldX":41,"worldY":27,"worldWidth":5,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"right"},{"name":"road","worldX":40,"worldY":22,"worldWidth":5,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"left"},{"name":"road","worldX":5,"worldY":3,"worldWidth":1,"worldHeight":28,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"down"},{"name":"road","worldX":6,"worldY":3,"worldWidth":14,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"left"},{"name":"road","worldX":40,"worldY":14,"worldWidth":1,"worldHeight":16,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"up"},{"name":"robot","worldX":42,"worldY":24,"worldWidth":2,"worldHeight":2,"color":15447790,"depth":4,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32}},{"name":"road","worldX":45,"worldY":22,"worldWidth":1,"worldHeight":5,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"up"},{"name":"road","worldX":41,"worldY":2,"worldWidth":1,"worldHeight":12,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"up"},{"name":"road","worldX":20,"worldY":1,"worldWidth":22,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"left"},{"name":"road","worldX":20,"worldY":1,"worldWidth":1,"worldHeight":30,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"down"},{"name":"road","worldX":6,"worldY":17,"worldWidth":37,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"right"},{"name":"road","worldX":4,"worldY":14,"worldWidth":38,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"right"},{"name":"road","worldX":3,"worldY":18,"worldWidth":3,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"left"},{"name":"road","worldX":42,"worldY":13,"worldWidth":1,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"left"},{"name":"road","worldX":21,"worldY":21,"worldWidth":3,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"right"},{"name":"road","worldX":24,"worldY":17,"worldWidth":1,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"right"},{"name":"road","worldX":24,"worldY":18,"worldWidth":1,"worldHeight":4,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"up"},{"name":"road","worldX":30,"worldY":14,"worldWidth":1,"worldHeight":4,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"down"},{"name":"road","worldX":11,"worldY":1,"worldWidth":1,"worldHeight":3,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"up"},{"name":"road","worldX":12,"worldY":1,"worldWidth":8,"worldHeight":1,"color":0,"depth":899,"worldLimit":{"x1":0,"y1":0,"x2":47,"y2":32},"direction":"right"}]';
        }
        return this.scene.game.data;
    }
}