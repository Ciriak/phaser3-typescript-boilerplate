/// <reference path="../node_modules/phaser3-docs/typescript/phaser.d.ts" />

import "phaser";
import { MainScene } from "./scripts/scenes/MainScene";
import "./styles/style.scss";

export class Game extends Phaser.Game {
  constructor() {
    const gameParameters: GameConfig = {
      type: Phaser.AUTO,
      parent: "game",
      width: document.body.offsetWidth,
      height: window.innerHeight,
      backgroundColor: "#000000",
      scene: [MainScene],
      physics: {
        default: "arcade",
        arcade: {
          debug: false // true for collisions debug
        }
      },
    };
    super(gameParameters);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  new Game();
};
