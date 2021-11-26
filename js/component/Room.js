import ItemEdittable from "./ItemEdittable.js";
import People from "./People.js";


export default class Room extends ItemEdittable {
    constructor(data) {
        super(data);
        this.itemCore = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, this.width - this.scene.baseSquareSize.x / 2, this.height - this.scene.baseSquareSize.y / 2, 0xa5ab00);
        this.add(this.itemCore)

        this.roomDoors = [];
        let randDoors = Math.floor(Math.random() * 100) % 4 + 1;
        this.numOfDoors = 0;
        this.addRoomDoors(randDoors);

        this.peopleInRoom = [];
        this.numOfPeople = 0;
        this.maxNumOfPeople = Math.floor((this.worldWidth - 1) / 3) * Math.floor((this.worldHeight - 1) / 3);


    }

    addRoomDoors(_numOfDoors) {

        if (this.numOfDoors > _numOfDoors) {
            while (this.numOfDoors > _numOfDoors) {
                let dooor = this.roomDoors.pop();
                dooor.setActive(false).setVisible(false);
                this.numOfDoors--;
            }
        }
        if (this.numOfDoors < _numOfDoors) {
            if (this.numOfDoors == 0 && _numOfDoors >= 1) {
                let newDoors = new Phaser.GameObjects.Rectangle(this.scene, -this.width / 2 + this.scene.baseSquareSize.x, -this.height / 2 + this.scene.baseSquareSize.y / 2, this.scene.baseSquareSize.x * 2, this.scene.baseSquareSize.y, 0xdd0000);
                this.add(newDoors);
                this.roomDoors.push(newDoors);
                this.numOfDoors++;
            }
            if (this.numOfDoors == 1 && _numOfDoors >= 2) {
                let newDoors = new Phaser.GameObjects.Rectangle(this.scene, this.width / 2 - this.scene.baseSquareSize.x, this.height / 2 - this.scene.baseSquareSize.y / 2, this.scene.baseSquareSize.x * 2, this.scene.baseSquareSize.y, 0xdd0000);
                this.add(newDoors);
                this.roomDoors.push(newDoors);
                this.numOfDoors++;
            }
            if (this.numOfDoors == 2 && _numOfDoors >= 3) {
                let newDoors = new Phaser.GameObjects.Rectangle(this.scene, -this.width / 2 + this.scene.baseSquareSize.x / 2, this.height / 2 - this.scene.baseSquareSize.y, this.scene.baseSquareSize.x, this.scene.baseSquareSize.y * 2, 0xdd0000);
                this.add(newDoors);
                this.roomDoors.push(newDoors);
                this.numOfDoors++;
            }
            if (this.numOfDoors == 3 && _numOfDoors >= 4) {
                let newDoors = new Phaser.GameObjects.Rectangle(this.scene, this.width / 2 - this.scene.baseSquareSize.x / 2, -this.height / 2 + this.scene.baseSquareSize.y, this.scene.baseSquareSize.x, this.scene.baseSquareSize.y * 2, 0xdd0000);
                this.add(newDoors);
                this.roomDoors.push(newDoors);
                this.numOfDoors++;
            }
        }


    }

    addPeopleInRoom(_numOfPeople) {
        if (_numOfPeople < 0) _numOfPeople = 0;
        if (_numOfPeople > this.maxNumOfPeople) _numOfPeople = this.maxNumOfPeople;
        if (this.numOfPeople > _numOfPeople) {
            while (this.numOfPeople > _numOfPeople) {
                let pp = this.peopleInRoom.pop();
                this.remove(pp);
                pp.setActive(false).setVisible(false);
                this.numOfPeople--;
            }

        }
        if (this.numOfPeople < _numOfPeople) {
            while (this.numOfPeople < _numOfPeople) {
                let pp = new People({
                    scene: this.scene,
                    name: 'people',
                    worldX: -this.x / this.scene.baseSquareSize.x + this.getWorldX() + 3 * ((this.numOfPeople) % Math.floor((this.worldWidth - 1) / 3) + 1) - 2,
                    worldY: -this.y / this.scene.baseSquareSize.y + this.getWorldY() + 3 * Math.ceil((this.numOfPeople + 1) / Math.floor((this.worldWidth - 1) / 3)) - 2,
                    worldWidth: 2,
                    worldHeight: 2,
                    color: 0x333333,
                    depth: 4
                });
                this.peopleInRoom.push(pp);
                this.numOfPeople++;
                this.add(pp);
            }

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
            },
            numberOfPeople: this.numOfPeople,
            numberOfDoor: this.numOfDoors
        }
    }
}