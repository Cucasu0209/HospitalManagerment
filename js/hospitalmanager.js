import MainScene from "./MainScene.js";
import MainSettingScene from "./MainSettingScene.js";

const config = {
    width: 1340,
    height: 640,
    backgroundColor: '#555555',
    type: Phaser.AUTO,
    parent: 'phaser-game',
    scene: [MainSettingScene, MainScene]
};

new Phaser.Game(config);