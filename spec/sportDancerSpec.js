describe('sportDancer', function() {

  var sport, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    sport = new SportDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(sport.$node).to.be.an.instanceof(jQuery);
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(sport, 'step');
      expect(sport.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(sport.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(sport.step.callCount).to.be.equal(2);
    });

    it('should have a setPosition method that sets the position of the node', function() {
      sport.setPosition(50, 60);
      expect(sport.$node.css('top')).to.equal('50px');
      expect(sport.$node.css('left')).to.equal('60px');
    });

    it('should react to mouseover event by rotating the node', function() {
      sinon.spy(sport.$node, 'css');
      sport.reactToMouse();
      expect(sport.$node.css.calledWithMatch({ transform: 'rotate(360deg)' })).to.be.true;
    });
  });
});