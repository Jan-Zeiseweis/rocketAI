function Sun() {
  this.sprite = createSprite(width/2, 40);
  this.sprite.addAnimation("normal", "assets/sun1.png", "assets/sun3.png");
  this.sprite.scale = 0.3;
  this.sprite.immovable = true;
  this.sprite.debug = debug;
  this.sprite.setCollider('circle', 0, 0, 220 * this.sprite.scale);
}

