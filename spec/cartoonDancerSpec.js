describe('cartoonDancer', function() {

  var cartoon, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    cartoon = new CartoonDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(cartoon.$node).to.be.an.instanceof(jQuery);
  });

  // it('should have a step function that makes its node blink', function() {
  //   sinon.spy(cartoon.$node, 'toggle');
  //   cartoon.step();
  //   expect(cartoon.$node.toggle.called).to.be.true;
  // });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(cartoon, 'step');
      expect(cartoon.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(cartoon.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(cartoon.step.callCount).to.be.equal(2);
    });

    it('should have a lineUp method that animates the node to a new left position', function() {
      sinon.spy(cartoon.$node, 'animate');
      cartoon.lineUp();
      expect(cartoon.$node.animate.calledOnce).to.be.true;
    });

    it('should react to mouseover event by scaling the node', function() {
      sinon.spy(cartoon.$node, 'css');
      cartoon.reactToMouse();
      expect(cartoon.$node.css.calledWithMatch({ transform: 'scale(2)' })).to.be.true;
    });

  });
});