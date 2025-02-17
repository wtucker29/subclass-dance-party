describe('blinkyDancer', function() {

  var blinky, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinky = new BlinkyDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(blinky.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes its node blink', function() {
    sinon.spy(blinky.$node, 'toggle');
    blinky.step();
    expect(blinky.$node.toggle.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(blinky, 'step');
      expect(blinky.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(blinky.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(blinky.step.callCount).to.be.equal(2);
    });
  });
});
