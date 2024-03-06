  // Initialize game variables
  let currentPlayer = 'X';
  let moves = 0;
  let playerXWins = 0;
  let playerOWins = 0;

  // Get all cells
  const cells = document.querySelectorAll('.cell');

  // Add click event listener to each cell
  cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
  });

  // Function to handle cell click
  function handleCellClick(event) {
      const cell = event.target;

      // Check if the cell is already filled
      if (cell.textContent !== '') {
          return;
      }

      // Update cell with current player's symbol
      cell.textContent = currentPlayer;

      // Check for a win
      if (checkWin()) {
          // Increment the win count for the current player
          if (currentPlayer === 'X') {
              playerXWins++;
          } else {
              playerOWins++;
          }

          // Display the win count
          console.log(`Player X wins: ${playerXWins}`);
          console.log(`Player O wins: ${playerOWins}`);
          document.getElementById('playerXWins').textContent = playerXWins;
          document.getElementById('playerOWins').textContent = playerOWins;

          // Reset the game
          resetGame();
          return;
      }

      // Check for a draw
      moves++;
      if (moves === 9) {
          console.log('It\'s a draw!');
          resetGame();
          return;
      }

      // Switch to the next player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  // Function to check for a win
  function checkWin() {
      const winningCombinations = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
          [0, 4, 8], [2, 4, 6] // Diagonals
      ];

      for (const combination of winningCombinations) {
          const [a, b, c] = combination;
          if (
              cells[a].textContent === currentPlayer &&
              cells[b].textContent === currentPlayer &&
              cells[c].textContent === currentPlayer
          ) {
              return true;
          }
      }

      return false;
  }

  // Function to reset the game
  function resetGame() {
      cells.forEach(cell => {
          cell.textContent = '';
      });

      currentPlayer = 'X';
      moves = 0;
  }