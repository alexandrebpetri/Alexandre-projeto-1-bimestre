let games = [];

function loadCSV() {
    fetch('db/games.csv') // caminho do arquivo CSV
        .then(response => response.text())
        .then(content => {
            const strings = content.split("\n");
            games = [];

            for (let i = 0; i < strings.length; i++) {
                const string = strings[i].trim();
                if (string) {
                    const data = string.split(";");
                    if (data.length === 6) {
                        games.push(new Game(
                            parseInt(data[0]), 
                            data[1], 
                            data[2], 
                            data[3], 
                            parseFloat(data[4]), 
                            data[5]
                        ));
                    }
                }
            }
            loadGames();
        })
        .catch(error => {
            console.error("Erro ao carregar o CSV:", error);
        });
}


function loadGames() {
    const container = document.getElementById("lista-jogos");
    container.innerHTML = "";
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        let priceDisplay = game.price === 0 ? "Grátis" : `R$ ${game.price.toFixed(2)}`;

        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
            <img src="${game.image}" alt="${game.name}" />
            <h2>${game.name}</h2>
            <p>${priceDisplay}</p>
            <button onclick="verDetalhes(${game.id})">Ver mais</button>
        `;
        container.appendChild(card);
    }
}

window.onload = loadCSV;