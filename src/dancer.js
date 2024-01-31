var Dancer = function(top, left, timeBetweenSteps) {
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  this.step();
  //this.bindMouse();
  this.$node.on('mouseover', this.reactToMouse.bind(this));
};

Dancer.prototype.step = function() {
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.danceOff = function() {
  // Iterate through each dancer
  window.dancers.forEach(function(dancer) {
    // Find closest neighbors
    var closest = dancer.closestNeighbors(dancer, window.dancers, 2);
    // Group together and do something
    dancer.groupTogether(closest);
  });
};

Dancer.prototype.findDistance = function(dancer1, dancer2) {
  // Set positions for the two dancers
  var x1 = dancer1.$node.position().left;
  var y1 = dancer1.$node.position().top;
  var x2 = dancer2.$node.position().left;
  var y2 = dancer2.$node.position().top;

  // Use pythagorean theorem to find distance between two objects
  var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance;
};

Dancer.prototype.closestNeighbors = function(dancer, allDancers, n) {
  // Create empty distances array
  var distances = [];
  // Iterate through the window.dancers global storage array
  allDancers.forEach(function(otherDancer) {
    // Run findDistance function
    var distance = otherDancer.findDistance(dancer, otherDancer);
    // Push distance object into array
    distances.push({ dancer: otherDancer, distanceBetween: distance });
  });

  // Sort distances by closest values
  distances.sort(function(a, b) {
    return a.distanceBetween - b.distanceBetween;
  });

  // Set what the closest neighbor is
  var closestNeighbors = distances.slice(0, n).map(function(item) {
    return item.dancer;
  });

  return closestNeighbors;
};

Dancer.prototype.groupTogether = function(neighbors) {
  // Set average positions
  var averagePosition = {
    top: 0,
    left: 0
  };
  // Iterate through the closest neighbors
  neighbors.forEach(function(neighbor) {
    // update average position values
    averagePosition.top += neighbor.$node.position().top;
    averagePosition.left += neighbor.$node.position().left;
  });

  // Divide by length of input for true average
  averagePosition.top /= neighbors.length;
  averagePosition.left /= neighbors.length;

  // Iterate through each neighbor to then run moveTo function
  neighbors.forEach(function(neighbor) {
    neighbor.moveTo(averagePosition);
  });
};

Dancer.prototype.moveTo = function(position) {
  // Animate movement with JQuery
  this.$node.animate({
    top: position.top,
    left: position.left
  }, 500);
};