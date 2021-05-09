
const gameStatus = document.getElementById('game-status');
const turnPara = document.getElementById('turn');
const activePlayer = document.getElementById('active-player');

var gridValues;
var gameEnded;

var turnsPlayed;
var playerXTurns;
var player0Turns;

const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

const init = () =>
{
    turnPara.innerHTML = `Player <span id="active-player">X</span>'s turn to play`;
    activePlayer.innerHTML = 'X';

    gridValues = [];
    gameEnded = false;
    gameStatus.innerHTML = "Active game";

    turnsPlayed = 0;
    playerXTurns = 0;
    player0Turns = 0;
};

window.onload = init();

const updateGrid = (id) =>
{
    if (gridValues[id] == undefined && !gameEnded)
    {
        var play = activePlayer.innerHTML;
        var grid = document.getElementById(`grid-${id}`);

        grid.value = play;
        gridValues[id] = play;

        if (play == 'X') playerXTurns++;
        if (play == '0') player0Turns++;

        var playerTurns = (play == '0') ? player0Turns : playerXTurns;
        if (playerTurns > 2) checkIfWon(play, id);

        activePlayer.innerHTML = (play == '0') ? 'X' : '0';

        turnsPlayed = playerXTurns + player0Turns;
        if (turnsPlayed == 9 && !gameEnded)
        {
            gameStatus.innerHTML = `<b>Match is tied</b>`;
            turnPara.innerHTML = '-----------';
        }
    };
};

const checkIfWon = (play, id) =>
{
    winningConditions.forEach(row =>
    {
        if (row.includes(id))
        {
            if ((gridValues[row[0]] == play) && (gridValues[row[1]] == play) && (gridValues[row[2]] == play))
            {
                gameStatus.innerHTML = `<b>Player ${play} has won</b>`;
                gameEnded = true;
                turnPara.innerHTML = '-----------';
            };
        };
    });
};

const reset = () =>
{
    for(var i = 0; i < 9; i++)
    {
        var grid = document.getElementById(`grid-${i+1}`);
        grid.value = '';
    }
    
    init();
};