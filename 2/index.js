
const fs = require('fs');

const dices = {
    red: 12,
    green: 13,
    blue: 14
}

fs.readFile('input2.txt', 'utf8', (_, data) => {
    const lines = data.split('\n').map(line => line.trim().slice(5));
    const parsedData = buildMapGames(lines);
    const gameIds = Array.from(parsedData.keys()).filter(key => isGamePossible(parsedData.get(key)));
    console.log('first star: ', gameIds.reduce((acc, id) => acc + +id, 0));

    const minDiceNeeded = Array.from(parsedData.values());

    console.log('second star: ',
        minDiceNeeded.map(sessions => {
            const result = { red: 0, green: 0, blue: 0 };
            sessions.forEach(game => {
                const { red, green, blue } = game;
                result.red = Math.max(result.red, red);
                result.green = Math.max(result.green, green);
                result.blue = Math.max(result.blue, blue);
            });
            return result;
        })
        .map(minDices => (minDices.red || 1) * (minDices.green || 1) * (minDices.blue || 1))
        .reduce((acc, value) => acc + value, 0)
    );
});

const buildMapGames = (lines) => {
    const mapGames = new Map();

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const [id, sessionsStr] = line.split(':');
        let sessions = sessionsStr
            .split(';')
            .map(session => session.trim())
            .map(session => session.split(','))
            .map(session => session.map(score => score.trim()));
        
        sessions = sessions.map(session => {
            const result = { green: 0, red: 0, blue: 0 };
            session.forEach(score => {
                const { number, color } = extractNumberAndColor(score);
                switch (color) {
                    case 'green':
                        result.green += +number;
                        break;
                    case 'red':
                        result.red += +number;
                        break;
                    case 'blue':
                        result.blue += +number;
                        break;
                }
            });
            return result;
        })

        mapGames.set(id, sessions);
    }

    return mapGames;
};

const extractNumberAndColor = str => {
    const [number, color] = str.split(' ');
    return { number, color };
};

const isGamePossible = (game) => {
    return game.every(session => {
        const { red, green, blue } = session;
        return (red <= dices.red && green <= dices.green && blue <= dices.blue);
    })
};
