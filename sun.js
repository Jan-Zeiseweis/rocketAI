function Sun() {
  this.sprite = createSprite(width/2, 40);
  this.sprite.scale = 0.3;
  this.sprite.addAnimation("normal", "assets/sun1.png", "assets/sun3.png");
}

