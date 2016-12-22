function Population() {
  this.maxSteps = 600;
  this.ships = [];

  for (var i = 0; i < numShips; i++) {
    this.ships.push(new Ship());
  }
}
