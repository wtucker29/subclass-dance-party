var CartoonDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<img class="cartoon" src="pikachu-dance.gif" alt="Pikachu"></img>');
  this.setPosition(top, left);
  this.$node.on('mouseover', this.reactToMouse.bind(this));
};

CartoonDancer.prototype = Object.create(Dancer.prototype);
CartoonDancer.prototype.constructor = CartoonDancer;

CartoonDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  // this.$node.toggle();
};

CartoonDancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
  console.log('Cartoon position set');
};

CartoonDancer.prototype.lineUp = function() {
  console.log('Lineup cartoon dancers');
  var leftPosition = 50;
  this.$node.stop().animate({ left: leftPosition }, 500);
  leftPosition += this.$node.width() + 10;
};

CartoonDancer.prototype.reactToMouse = function() {
  console.log('Mouseover event');
  this.$node.css({
    transform: 'scale(2)',
    transition: 'transform 5s'
  });
};