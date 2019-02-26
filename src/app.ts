/// <reference path="../node_modules/phaser3-docs/typescript/phaser.d.ts" />

import "phaser";
import { MainScene } from "./scripts/scenes/MainScene";
import "./styles/style.scss";

export class Game extends Phaser.Game {
  constructor() {
    const gameParameters: GameConfig = {
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
    super(gameParameters);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  const game = new Game();
};
