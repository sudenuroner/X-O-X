// oyun tahtasındaki tüm hücreleri seçer
const cells = document.querySelectorAll(".cell");

// oyun durumu mesajını göstermek için öğeyi seçer
const message = document.getElementById("message");

// Şu anki oyuncuyu belirlemek için bu değişken oluşturuldu
let currentPlayer = "X";

// oyun tahtasını temsil eden dizi ve başlangıçta boşluklarla doldurulur
let gameBoard = ["", "", "", "", "", "", "", "", "",];

// oyunun bitip bitmediğni belirlemek için değişken oluşturulur
let gameIsOver = false;

// kazanma durumlarını kontrol eden fonsiyon
function checkWin(){
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for(let pattern of winPatterns){
        // mevcut kazanma durumunun hücre indislerini ayrıştırır
        const [a, b, c] = pattern;
        // eğer aynı oyuncunun işareti üç hücrede aynıysa, oyunu kazanan oyuncu belirler
        if (
            gameBoard[a] && 
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ){
            gameIsOver = true;
            message.textContent = `${currentPlayer} KAZANDI`;

            // kazanan hücreleri renklendirir
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
            return;
        }
    }

    // eğer oyun tahtası doluysa ve kazanan yoksa oyun berabere biter
    if (!gameBoard.includes("")) {
        gameIsOver = true;
        message.textContent = "OYUN BERABERE!";
    }
}

// oyuncunun hamle yapmasını sağlayan fonksiyon
function makeMove(cellIndex){
    // eğer hücre boşsa ve oyun bitmemişse hamle yapılır
    if(!gameBoard[cellIndex] && !gameIsOver){
        // hücreye mevcut oyuncunun işareti eklenir
        gameBoard[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        cells[cellIndex].classList.add(currentPlayer);

        // kazanma durumunu kontrol ettik
        checkWin();

        // oyuncu değiştirilir (X -> 0, 0 -> X)
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

// oyunu yeniden başlatan fonksiyon
function restartGame(){
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", "",];
    gameIsOver = false;
    message.textContent = "";

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("win", "X", "O");
    });
}