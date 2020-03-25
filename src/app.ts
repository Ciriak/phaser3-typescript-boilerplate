import MainScene from "./scripts/scenes/MainScene";
import "./styles/style.scss";
import * as Phaser from "phaser";

const gameConfig: Phaser.Types.Core.GameConfig = {
  backgroundColor: "#000000",
  height: window.innerHeight,
  parent: "game",
  physics: {
    arcade: {
      debug: false, // true for collisions debug
    },
    default: "arcade",
  },
  scene: [MainScene],
  type: Phaser.AUTO,
  width: document.body.offsetWidth,
};
const game = new Phaser.Game(gameConfig);
