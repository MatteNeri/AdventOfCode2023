
const fs = require('fs');

const digits = [
    /one/g,
    /two/g,
    /three/g,
    /four/g,
    /five/g,
    /six/g,
    /seven/g,
    /eight/g,
    /nine/g
];

fs.readFile('input2.txt', 'utf8', (_, data) => {
    const lines = data.split('\n');
    console.log(lines.map(extractDigits).reduce((a, b) => a + b, 0));
});

const extractDigits = line => {
    let startIndex = 0;
    let endIndex = line.length - 1;
    let firstDigitFound = -1;
    let lastDigitFound = -1;
    for (let i = 0; i < line.length; i++) {
        if (firstDigitFound === -1 && stringHasDigits(line.substring(startIndex, i + 1))) {
            firstDigitFound = extractNumber(line.substring(startIndex, i + 1));
        }
        if (lastDigitFound === -1 && stringHasDigits(line.substring(endIndex - i, endIndex + 1))) {
            lastDigitFound = extractNumber(line.substring(endIndex - i, endIndex + 1));
        }
        if (firstDigitFound !== -1 && lastDigitFound !== -1) {
            break;
        }
    }

    return Number(`${firstDigitFound}${lastDigitFound}`)
 };

 const stringHasDigits = str => {
    if(/\d/g.test(str)) {
        return true;
    };
    for(const regex of digits) {
        if(regex.test(str)) {
            return true;
        }
    }
    return false;
 };

const extractNumber = str => {
    let parsedString = 0;
    for (let [index, regex] of digits.entries()) {
        if (str.match(regex)) {
            parsedString = index + 1;
            break;
        }
    }
    if(parsedString) {
        return Number(parsedString);
    }
    const matches = str.matchAll(/\d/g);
    let result = '';
    for (const match of matches) {
        result += match[0];
    }
    return Number(result);
}
