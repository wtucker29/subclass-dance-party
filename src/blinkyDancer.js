var BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  // this.$node = $('<img class="dancer" src="spidey.gif" alt="Emo Spiderman"></img>');
  this.setPosition(top, left);
  this.$node.on('mouseover', this.reactToMouse.bind(this));
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  this.$node.toggle();
};

BlinkyDancer.prototype.lineUp = function() {
  var topPosition = 50;
  this.$node.stop().animate({ top: topPosition }, 500);
  topPosition += this.$node.height() + 10;
};

BlinkyDancer.prototype.reactToMouse = function() {
  console.log('Mouseover event');
  this.$node.css({
    transform: 'scale(3)',
    transition: 'transform 5s',
  });
};
