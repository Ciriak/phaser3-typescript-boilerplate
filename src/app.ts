/// <reference path="../node_modules/phaser3-docs/typescript/phaser.d.ts" />

import "phaser";
import { MainScene } from "./scripts/scenes/MainScene";
import "./styles/style.scss";

const gameConfig: GameConfig = {
  backgroundColor: "#000000",
  height: window.innerHeight,
  parent: "game",
  physics: {
    arcade: {
      debug: false, // true for collisions debug
    },
    default: "arcade",
    scene: [MainScene],
  },
  type: Phaser.AUTO,
  width: document.body.offsetWidth,
};

const game = new Phaser.Game(gameConfig);
