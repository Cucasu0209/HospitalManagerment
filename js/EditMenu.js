import ButtonBase from "./ButtonBase.js";


export default class EditMenu extends Phaser.GameObjects.Container {
    constructor(data) {
        let { scene, x, y, width, height } = data;
        let body = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, 0x333333);
        let labelEdit = new Phaser.GameObjects.Text(scene, width / 2, 15, "Edit Memu");
        labelEdit.setOrigin(0.5, 0.5);
        body.setOrigin(0);
        super(scene, x, y, [body, labelEdit]);
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.scene.add.existing(this);
        this.componentEditting = null;

        this.create();
    }

    create() {
        this.createRoomEditor();
        this.setRoomEditorActive(false);
        this.createAVGEditor();
        this.setAVGEditorActive(false);
        this.createBedEditor();
        this.setBedEditorActive(false);
        this.createRobotEditor();
        this.setRobotEditorActive(false);
        this.createPlayerEditor();
        this.setPlayerEditorActive(false);
        this.createPeopleEditor();
        this.setPeopleEditorActive(false);
    }

    createRoomEditor() {
        this.labelEditWidthRoom = new Phaser.GameObjects.Text(this.scene, 40, 60, "Width:");
        this.labelEditWidthRoom.setOrigin(0, 0.5);
        this.labelEditHeightRoom = new Phaser.GameObjects.Text(this.scene, 40, 100, "Height:");
        this.labelEditHeightRoom.setOrigin(0, 0.5);
        this.labelEditPeoplesRoom = new Phaser.GameObjects.Text(this.scene, 40, 140, "Peoples:");
        this.labelEditPeoplesRoom.setOrigin(0, 0.5);
        this.labelEditDoorsRoom = new Phaser.GameObjects.Text(this.scene, 40, 180, "Doors:");
        this.labelEditDoorsRoom.setOrigin(0, 0.5);
        this.widthRoom = 100;
        this.heightRoom = 100;
        this.peoplesRoom = 100;
        this.doorsRoom = 100;
        this.labelWidthRoom = new Phaser.GameObjects.Text(this.scene, 150, 60, "10");
        this.labelWidthRoom.setOrigin(0, 0.5);
        this.labelHeightRoom = new Phaser.GameObjects.Text(this.scene, 150, 100, "7");
        this.labelHeightRoom.setOrigin(0, 0.5);
        this.labelPeoplesRoom = new Phaser.GameObjects.Text(this.scene, 150, 140, "3");
        this.labelPeoplesRoom.setOrigin(0, 0.5);
        this.labelDoorsRoom = new Phaser.GameObjects.Text(this.scene, 150, 180, "3");
        this.labelDoorsRoom.setOrigin(0, 0.5);
        this.add([this.labelEditWidthRoom, this.labelEditHeightRoom, this.labelEditPeoplesRoom, this.labelEditDoorsRoom,
            this.labelHeightRoom, this.labelWidthRoom, this.labelPeoplesRoom, this.labelDoorsRoom
        ]);

        this.increaseRoomWidthBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 230,
            y: this.y + 60,
            width: 20,
            height: 20,
            text: "+",
            onClick: () => {
                let newWidth = this.componentEditting.worldWidth + 1;
                if (newWidth >= 4 && newWidth <= 20) {
                    this.componentEditting = this.scene.mainGamePlayScene.getNewRoom(newWidth, this.componentEditting.worldHeight, this.componentEditting);
                    this.WidthRoom = this.componentEditting.worldWidth;
                    this.labelWidthRoom.text = this.WidthRoom + "";
                    this.peoplesRoom = this.componentEditting.numOfPeople;
                    this.labelPeoplesRoom.text = this.peoplesRoom + "";
                }

            }
        });
        this.decreaseRoomWidthBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 130,
            y: this.y + 60,
            width: 20,
            height: 20,
            text: "-",
            onClick: () => {
                let newWidth = this.componentEditting.worldWidth - 1;
                if (newWidth >= 4 && newWidth <= 20) {
                    this.componentEditting = this.scene.mainGamePlayScene.getNewRoom(newWidth, this.componentEditting.worldHeight, this.componentEditting);
                    this.WidthRoom = this.componentEditting.worldWidth;
                    this.labelWidthRoom.text = this.WidthRoom + "";
                    this.peoplesRoom = this.componentEditting.numOfPeople;
                    this.labelPeoplesRoom.text = this.peoplesRoom + "";
                }

            }
        });
        this.increaseRoomHeightBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 230,
            y: this.y + 100,
            width: 20,
            height: 20,
            text: "+",
            onClick: () => {
                let newHeight = this.componentEditting.worldHeight + 1;
                if (newHeight >= 4 && newHeight <= 15) {
                    this.componentEditting = this.scene.mainGamePlayScene.getNewRoom(this.componentEditting.worldWidth, newHeight, this.componentEditting);
                    this.heightRoom = this.componentEditting.worldHeight;
                    this.labelHeightRoom.text = this.heightRoom + "";
                    this.peoplesRoom = this.componentEditting.numOfPeople;
                    this.labelPeoplesRoom.text = this.peoplesRoom + "";
                }

            }
        });
        this.decreaseRoomHeightBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 130,
            y: this.y + 100,
            width: 20,
            height: 20,
            text: "-",
            onClick: () => {
                let newHeight = this.componentEditting.worldHeight - 1;
                if (newHeight >= 4 && newHeight <= 15) {
                    this.componentEditting = this.scene.mainGamePlayScene.getNewRoom(this.componentEditting.worldWidth, newHeight, this.componentEditting);
                    this.heightRoom = this.componentEditting.worldHeight;
                    this.labelHeightRoom.text = this.heightRoom + "";
                    this.peoplesRoom = this.componentEditting.numOfPeople;
                    this.labelPeoplesRoom.text = this.peoplesRoom + "";
                }

            }
        });

        this.increaseRoomPeoplesBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 230,
            y: this.y + 140,
            width: 20,
            height: 20,
            text: "+",
            onClick: () => {
                this.componentEditting.addPeopleInRoom(this.componentEditting.numOfPeople + 1);
                this.peoplesRoom = this.componentEditting.numOfPeople;
                this.labelPeoplesRoom.text = this.peoplesRoom + "";

            }
        });
        this.decreaseRoomPeoplesBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 130,
            y: this.y + 140,
            width: 20,
            height: 20,
            text: "-",
            onClick: () => {
                this.componentEditting.addPeopleInRoom(this.componentEditting.numOfPeople - 1);
                this.peoplesRoom = this.componentEditting.numOfPeople;
                this.labelPeoplesRoom.text = this.peoplesRoom + "";
            }
        });

        this.increaseRoomDoorsBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 230,
            y: this.y + 180,
            width: 20,
            height: 20,
            text: "+",
            onClick: () => {
                let newValue = this.componentEditting.numOfDoors + 1;
                if (newValue >= 1 && newValue <= 4) {
                    this.componentEditting.addRoomDoors(newValue);
                    this.doorsRoom = newValue;
                    this.labelDoorsRoom.text = newValue + "";
                }
            }
        });
        this.decreaseRoomDoorsBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 130,
            y: this.y + 180,
            width: 20,
            height: 20,
            text: "-",
            onClick: () => {
                let newValue = this.componentEditting.numOfDoors - 1;
                if (newValue >= 1 && newValue <= 4) {
                    this.componentEditting.addRoomDoors(newValue);
                    this.doorsRoom = newValue;
                    this.labelDoorsRoom.text = newValue + "";
                }
            }
        });

        this.saveRoomBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width - 100,
            y: this.y + this.height - 50,
            width: 100,
            height: 30,
            text: "Save",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
            },
        });
        this.deleteRoomBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 100,
            y: this.y + this.height - 50,
            width: 100,
            height: 30,
            text: "Delete",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
                this.scene.mainGamePlayScene.deleteComponent(this.componentEditting);
                this.componentEditting = null;
            }
        });
        this.isRoomEditorActive = true;
        this.setRoomEditorActive(true);
    }

    setRoomEditorActive(isActive, objectEditting) {
        if (isActive && !this.isRoomEditorActive) {
            this.componentEditting = objectEditting;
            this.widthRoom = objectEditting.worldWidth;
            this.heightRoom = objectEditting.worldHeight;
            this.peoplesRoom = objectEditting.numOfPeople;
            this.doorsRoom = objectEditting.numOfDoors;
            this.labelWidthRoom.text = objectEditting.worldWidth + "";
            this.labelHeightRoom.text = objectEditting.worldHeight + "";
            this.labelPeoplesRoom.text = objectEditting.numOfPeople + "";
            this.labelDoorsRoom.text = objectEditting.numOfDoors + "";
            this.labelEditWidthRoom.x -= 100000;
            this.labelEditHeightRoom.x -= 100000;
            this.labelEditPeoplesRoom.x -= 100000;
            this.labelEditDoorsRoom.x -= 100000;
            this.labelWidthRoom.x -= 100000;
            this.labelHeightRoom.x -= 100000;
            this.labelPeoplesRoom.x -= 100000;
            this.labelDoorsRoom.x -= 100000;
            this.increaseRoomWidthBtn.x -= 100000;
            this.decreaseRoomWidthBtn.x -= 100000;
            this.increaseRoomHeightBtn.x -= 100000;
            this.decreaseRoomHeightBtn.x -= 100000;
            this.increaseRoomPeoplesBtn.x -= 100000;
            this.decreaseRoomPeoplesBtn.x -= 100000;
            this.increaseRoomDoorsBtn.x -= 100000;
            this.decreaseRoomDoorsBtn.x -= 100000;
            this.saveRoomBtn.x -= 100000;
            this.deleteRoomBtn.x -= 100000;
        }
        if (!isActive && this.isRoomEditorActive) {
            this.labelEditWidthRoom.x += 100000;
            this.labelEditHeightRoom.x += 100000;
            this.labelEditPeoplesRoom.x += 100000;
            this.labelEditDoorsRoom.x += 100000;
            this.labelWidthRoom.x += 100000;
            this.labelHeightRoom.x += 100000;
            this.labelPeoplesRoom.x += 100000;
            this.labelDoorsRoom.x += 100000;
            this.increaseRoomWidthBtn.x += 100000;
            this.decreaseRoomWidthBtn.x += 100000;
            this.increaseRoomHeightBtn.x += 100000;
            this.decreaseRoomHeightBtn.x += 100000;
            this.increaseRoomPeoplesBtn.x += 100000;
            this.decreaseRoomPeoplesBtn.x += 100000;
            this.increaseRoomDoorsBtn.x += 100000;
            this.decreaseRoomDoorsBtn.x += 100000;
            this.saveRoomBtn.x += 100000;
            this.deleteRoomBtn.x += 100000;
        }
        this.isRoomEditorActive = isActive;
    }

    createAVGEditor() {
        this.selfControlAVGBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width / 2,
            y: this.y + 50,
            width: 350,
            height: 30,
            text: "Set Self Control",
            onClick: () => {
                this.componentEditting.setSelfControl(true);
            },
        });

        this.AICreateAVGPath = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width / 2,
            y: this.y + 100,
            width: 350,
            height: 30,
            text: "Choose End Point and Create AI Path",
            onClick: () => {

            },
        });
        this.createAVGPath = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width / 2,
            y: this.y + 150,
            width: 350,
            height: 30,
            text: "Lock Position and Create Path",
            onClick: () => {
                this.componentEditting.setSelfControl(false);
                this.componentEditting.lockPosition();
            },
        });

        this.deleteAVGPath = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width / 2,
            y: this.y + 200,
            width: 350,
            height: 30,
            text: "UnLock Position and Delete Path",
            onClick: () => {
                this.componentEditting.setSelfControl(false);
                this.componentEditting.unlockPosition();
            },
        });

        this.saveAVGBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width - 100,
            y: this.y + this.height - 50,
            width: 100,
            height: 30,
            text: "Save",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
            },
        });
        this.deleteAVGBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 100,
            y: this.y + this.height - 50,
            width: 100,
            height: 30,
            text: "Delete",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
                this.scene.mainGamePlayScene.deleteComponent(this.componentEditting);
                this.componentEditting = null;
            }
        });
        this.isAVGEditorActive = true;
        this.setAVGEditorActive(true);
    }

    setAVGEditorActive(isActive, objectEditting) {
        if (isActive && !this.isAVGEditorActive) {
            this.componentEditting = objectEditting;
            this.AICreateAVGPath.x -= 100000;
            this.selfControlAVGBtn.x -= 100000;
            this.deleteAVGPath.x -= 100000;
            this.createAVGPath.x -= 100000;
            this.saveAVGBtn.x -= 100000;
            this.deleteAVGBtn.x -= 100000;
        }
        if (!isActive && this.isAVGEditorActive) {
            this.AICreateAVGPath.x += 100000;
            this.selfControlAVGBtn.x += 100000;
            this.deleteAVGPath.x += 100000;
            this.createAVGPath.x += 100000;
            this.saveAVGBtn.x += 100000;
            this.deleteAVGBtn.x += 100000;
        }
        this.isAVGEditorActive = isActive;
    }

    createBedEditor() {

        this.saveBedBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width - 100,
            y: this.y + this.height - 50,
            width: 100,
            height: 30,
            text: "Save",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
            },
        });
        this.deleteBedBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 100,
            y: this.y + this.height - 50,
            width: 100,
            height: 30,
            text: "Delete",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
                this.scene.mainGamePlayScene.deleteComponent(this.componentEditting);
                this.componentEditting = null;
            }
        });
        this.isBedEditorActive = true;
        this.setBedEditorActive(true);
    }

    setBedEditorActive(isActive, objectEditting) {
        if (isActive && !this.isBedEditorActive) {
            this.componentEditting = objectEditting;
            this.saveBedBtn.x -= 100000;
            this.deleteBedBtn.x -= 100000;
        }
        if (!isActive && this.isBedEditorActive) {
            this.saveBedBtn.x += 100000;
            this.deleteBedBtn.x += 100000;
        }
        this.isBedEditorActive = isActive;
    }



    createRobotEditor() {

        this.saveRobotBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width - 100,
            y: this.y + this.height - 50,
            width: 100,
            height: 30,
            text: "Save",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
            },
        });
        this.deleteRobotBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 100,
            y: this.y + this.height - 50,
            width: 100,
            height: 30,
            text: "Delete",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
                this.scene.mainGamePlayScene.deleteComponent(this.componentEditting);
                this.componentEditting = null;
            }
        });
        this.isRobotEditorActive = true;
        this.setRobotEditorActive(true);
    }

    setRobotEditorActive(isActive, objectEditting) {
        if (isActive && !this.isRobotEditorActive) {
            this.componentEditting = objectEditting;
            this.saveRobotBtn.x -= 100000;
            this.deleteRobotBtn.x -= 100000;
        }
        if (!isActive && this.isRobotEditorActive) {
            this.saveRobotBtn.x += 100000;
            this.deleteRobotBtn.x += 100000;
        }
        this.isRobotEditorActive = isActive;
    }



    createPlayerEditor() {

        this.savePlayerBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width - 100,
            y: this.y + this.height - 50,
            width: 100,
            height: 30,
            text: "Save",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
            },
        });
        this.deletePlayerBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 100,
            y: this.y + this.height - 50,
            width: 100,
            height: 30,
            text: "Delete",
            onClick: () => {
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
                this.scene.mainGamePlayScene.deleteComponent(this.componentEditting);
                this.componentEditting = null;
            }
        });
        this.isPlayerEditorActive = true;
        this.setPlayerEditorActive(true);
    }

    setPlayerEditorActive(isActive, objectEditting) {
        if (isActive && !this.isPlayerEditorActive) {
            this.componentEditting = objectEditting;
            this.savePlayerBtn.x -= 100000;
            this.deletePlayerBtn.x -= 100000;
        }
        if (!isActive && this.isPlayerEditorActive) {
            this.savePlayerBtn.x += 100000;
            this.deletePlayerBtn.x += 100000;
        }
        this.isPlayerEditorActive = isActive;
    }


    createPeopleEditor() {
        this.labelEditPeople = new Phaser.GameObjects.Text(this.scene, 50, 60, "Number of people:");
        this.labelEditPeople.setOrigin(0, 0.5);
        this.numberOfPeople = 10;
        this.labelPeople = new Phaser.GameObjects.Text(this.scene, 270, 60, "10");
        this.labelPeople.setOrigin(0, 0.5);

        this.add([this.labelPeople, this.labelEditPeople]);

        this.increasePeopleBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 330,
            y: this.y + 60,
            width: 20,
            height: 20,
            text: "+",
            onClick: () => {
                if (this.numberOfPeople + 1 > 20) return;
                this.numberOfPeople++;
                this.labelPeople.text = this.numberOfPeople + "";
            }
        });
        this.decreasePeopleBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + 240,
            y: this.y + 60,
            width: 20,
            height: 20,
            text: "-",
            onClick: () => {
                if (this.numberOfPeople - 1 < 0) return;
                this.numberOfPeople--;
                this.labelPeople.text = this.numberOfPeople + "";
            }
        });
        this.savePeopleBtn = new ButtonBase({
            scene: this.scene,
            x: this.x + this.width / 2,
            y: this.y + this.height - 50,
            width: 200,
            height: 30,
            text: "Save",
            onClick: () => {
                this.hideAllEditMenu();
                this.scene.mainGamePlayScene.setCurrentComponentEditting(null);
            },
        });
        this.isPeopleEditorActive = true;
        this.setPeopleEditorActive(true);
    }

    setPeopleEditorActive(isActive, objectEditting) {
        if (isActive && !this.isPeopleEditorActive) {
            this.componentEditting = objectEditting;
            this.labelEditPeople.x -= 100000;
            this.labelPeople.x -= 100000;
            this.increasePeopleBtn.x -= 100000;
            this.decreasePeopleBtn.x -= 100000;
            this.savePeopleBtn.x -= 100000;
        }
        if (!isActive && this.isPeopleEditorActive) {
            this.labelEditPeople.x += 100000;
            this.labelPeople.x += 100000;
            this.increasePeopleBtn.x += 100000;
            this.decreasePeopleBtn.x += 100000;
            this.savePeopleBtn.x += 100000;
        }
        this.isPeopleEditorActive = isActive;
    }


    hideAllEditMenu() {
        this.setRoomEditorActive(false);
        this.setAVGEditorActive(false);
        this.setBedEditorActive(false);
        this.setRobotEditorActive(false);
        this.setPlayerEditorActive(false);
        this.setPeopleEditorActive(false);
    }
}