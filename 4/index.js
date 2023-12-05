
import fs from 'fs';

fs.readFile('input.txt', 'utf8', (_, data) => {
    const fileLines = data.split('\n')
        .map(cleanLine)
        .map(stringToNumbersArray);
    const results = fileLines.map(line => calculateCardScore(line.winningNumbers, line.playerNumbers));
    const winnedCard = fileLines.map(() => 1);
    results.forEach((result, index) => {
        if(result > 0){
            const cardCopies = winnedCard[index];
            for(let i = index + 1; i <= index + result; i++) {
                winnedCard[i] = winnedCard[i] + cardCopies;
            }
        }
    });

    const totalPoints = results.reduce((acc, el) => {
        if(el < 2) {
            return acc + el;
        }
        return acc + Math.pow(2, el-1);
    }, 0);
    const totalWinnedCard = winnedCard.reduce((acc, el) => acc + el, 0);

    console.log('totalPoints:', totalPoints);
    console.log('totalWinnedCard: ', totalWinnedCard);
  });

const cleanLine = line => line.slice(line.indexOf(':') + 2);
 // '10  5 11 65 27 43 44 29 24 69 | 65 66 18 14 17 97 95 34 38 23 10 25 22 15 87  9 28 43  4 71 89 20 72  5  6',
const stringToNumbersArray = line => {
    const [winningNumbers, playerNumbers] = line.split('|');
    return {
        winningNumbers: winningNumbers.trim().split(/\s+/g).map(Number),
        playerNumbers: playerNumbers.trim().split(/\s+/g).map(Number),
    };
};

const calculateCardScore = (winningNumbers, playerNumbers) => {
    const w = [];
    winningNumbers.forEach(elWin => playerNumbers.some(elPla => elWin === elPla) ? w.push(elWin) : null);
    return w.length;
};
