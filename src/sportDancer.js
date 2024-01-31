var SportDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<img class ="sport" src="griddy.gif" alt="Jamarr Chase griddy"></img>');
  this.setPosition(top, left);
  this.$node.on('mouseover', this.reactToMouse.bind(this));
};

SportDancer.prototype = Object.create(Dancer.prototype);
SportDancer.prototype.constructor = SportDancer;

SportDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  //this.$node.toggle();
};

SportDancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
  console.log('Sport position set');
};

SportDancer.prototype.lineUp = function() {
  console.log('Lineup sport dancers');
  var leftPosition = 1600;
  this.$node.stop().animate({ left: leftPosition }, 500);
  leftPosition += this.$node.width() + 10;
};

SportDancer.prototype.reactToMouse = function() {
  console.log('Mouseover event');
  var currentRotation = this.$node.data('rotation') || 0;
  var newRotation = currentRotation + 360;
  this.$node.css({
    transform: 'rotate(' + newRotation + 'deg)',
    transition: 'transform 5s'
  }).data('rotation', newRotation);
};