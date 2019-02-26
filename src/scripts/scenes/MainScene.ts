export class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene",
    });
  }
  public preload() {
    this.load.image("gameImage", "./assets/graphics/ui/game.png");
  }

  public create() {
    this.add.image(400, 300, "gameImage");
  }
}
