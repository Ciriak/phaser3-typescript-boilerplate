export class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene"
    });
  }
  preload() {
    this.load.image("gameImage", "./assets/graphics/ui/game.png");
  }

  create() {
    this.add.image(400, 300, "gameImage");
  }
}
