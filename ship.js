function Ship(dna) {
  this.dna = dna || null;

  this.sprite = createSprite(width/2, height - 130);
  this.sprite.rotation = -90;
  this.sprite.scale = 0.4;
  this.sprite.friction = 0.98;
  this.sprite.wallHitCounter = 0;
  this.sprite.sunHitCounter = 0;
  this.sprite.restitution = 0.4;

  this.maxThrust = 0.2;
  this.maxRotation = 4;


  this.sprite.collided = false;
  this.sprite.debug= debug;

  this.sprite.addImage("normal", loadImage("assets/asteroids_ship0001.png"));
  this.sprite.addAnimation("thrust", "assets/asteroids_ship0001.png", "assets/asteroids_ship0007.png");


  this.update = function() {
    this.sprite.bounce(walls, this.hitWall);
    if (this.sprite.sunHitCounter < 5) {
      this.sprite.addSpeed(gravity.force, gravity.direction);
      this.sprite.bounce(obstacles);
      this.sprite.overlap(sun.sprite, this.hitSun);
      this.handleKeyboardInput();
      this.handleDNAInput();
    } else if (this.sprite.sunHitCounter === 5) {
      this.unsetBoost();
      this.setSpeed(0);
    }
  };

  this.setSpeed = function(amount) {
    this.sprite.setSpeed(0);
  };

  this.setRotation = function(amount) {
    this.sprite.rotation += amount;
  };

  this.setRotationPerentage = function(percentage) {
    var rotation = map(percentage, -100, 100, -this.maxRotation, this.maxRotation);
    this.sprite.rotation += rotation;
  };

  this.setThrustPercentage = function(percentage) {
      var thrust = map(percentage, 0, 100, 0, this.maxThrust);
      this.sprite.addSpeed(thrust, this.sprite.rotation);
      this.sprite.changeAnimation("thrust");
  };

  this.unsetBoost = function() {
    this.sprite.changeAnimation("normal");
  };

  this.handleKeyboardInput = function() {
    if(keyDown(LEFT_ARROW))
      this.setRotation(-4);
    if(keyDown(RIGHT_ARROW))
      this.setRotation(4);
    if(keyDown(UP_ARROW))
    {
      this.setThrustPercentage(100);
    }
    else
      this.unsetBoost();
  };

  this.handleDNAInput = function() {
    if (this.dna && step < this.dna.length) {
      var dna = this.dna[step];
      this.setThrustPercentage(dna.t);
      this.setRotationPerentage(-dna.l);
      this.setRotationPerentage(dna.r);
    }
  };

  this.hitWall = function(sprite, wall) {
    sprite.wallHitCounter++;
  };

  this.hitSun = function(sprite, sun) {
    sprite.sunHitCounter++;
  };
}
