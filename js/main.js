import { loadCSV, games } from '../data/data.js';

function loadGames() {
    const container = document.getElementById("lista-jogos");
    container.innerHTML = ""; // Limpar antes de carregar
  
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      let priceDisplay = game.price === 0 ? "Grátis" : `R$ ${game.price.toFixed(2)}`;
  
      const card = document.createElement("div");
      card.className = "game-card";
      card.onclick = () => seeGame(game.id);
      card.innerHTML = `
        <img src="${game.image}" alt="${game.name}" />
        <h2>${game.name}</h2>
        <p>${priceDisplay}</p>
      `;
      container.appendChild(card);
    }
  }
  
  function seeGame(id) {
    window.location.href = `details.html?id=${id}`;
  }
  
  // Deixar visível globalmente:
  window.seeGame = seeGame;
  
  
  // Primeiro carregar o CSV, depois montar a tela
  window.onload = () => {
    loadCSV().then(() => {
      loadGames();
    });
  };
  