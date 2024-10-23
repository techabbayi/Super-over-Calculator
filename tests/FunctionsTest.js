describe("Cricket Game Simulation", function() {
  
  beforeEach(function() {
    // Reset game state before each test
    resetGame();
  });

  it("should generate a random score from possible outcomes", function() {
    const randomScore = generateRandomScore();
    expect(possibleOutcomes).toContain(randomScore);
  });

  it("should update score and balls faced when updateScore is called", function() {
    spyOn(window, 'generateRandomScore').and.returnValue(4);
    spyOn(window, 'updateDOM'); // Prevent actual DOM updates
    updateScore();
    expect(gameState.team1.score).toBe(4);
    expect(gameState.team1.ballsFaced).toBe(1);
  });

  it("should increment wickets when 'W' is generated", function() {
    spyOn(window, 'generateRandomScore').and.returnValue("W");
    spyOn(window, 'updateDOM'); // Prevent actual DOM updates
    updateScore();
    expect(gameState.team1.wickets).toBe(1);
    expect(gameState.team1.score).toBe(0);
  });


  it("should reset game state when resetGame is called", function() {
    gameState.team1.score = 10;
    gameState.team2.wickets = 1;
    gameState.turn = 2;
    resetGame();
    expect(gameState.team1.score).toBe(0);
    expect(gameState.team2.wickets).toBe(0);
    expect(gameState.turn).toBe(1);
  });

  it("should end game when team 2 scores more than team 1", function() {
    spyOn(window, 'updateDOM'); // Prevent actual DOM updates
    spyOn(window, 'gameOver');
    gameState.team1.score = 5;
    gameState.turn = 2;
    spyOn(window, 'generateRandomScore').and.returnValue(6);
    updateScore();
    expect(gameState.turn).toBe(3);
    expect(window.gameOver).toHaveBeenCalled();
  });

  it("should end game when a team loses 2 wickets", function() {
    spyOn(window, 'updateDOM'); // Prevent actual DOM updates
    spyOn(window, 'generateRandomScore').and.returnValue("W");
    updateScore();
    updateScore();
    expect(gameState.turn).toBe(2);
    expect(gameState.team1.wickets).toBe(2);
  });

  // Test the gameOver function
  it("should declare the correct winner", function() {
    spyOn(window, 'alert');
    
    gameState.team1.score = 10;
    gameState.team2.score = 5;
    gameOver();
    expect(window.alert).toHaveBeenCalledWith("Team 1 wins!");

    gameState.team1.score = 5;
    gameState.team2.score = 10;
    gameOver();
    expect(window.alert).toHaveBeenCalledWith("Team 2 wins!");

    gameState.team1.score = 10;
    gameState.team2.score = 10;
    gameOver();
    expect(window.alert).toHaveBeenCalledWith("It's a tie!");
  });
});