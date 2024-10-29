const express = require('express');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');
const { resolve } = require('path');

const app = express();
const port = 3000;
let db;

(async () => {
  db = await open({ filename: './database.sqlite', driver: sqlite3.Database });
  if (db) console.log('Connected to the sqlite3 database');
})();
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

async function fetchAllGames() {
  let query = 'SELECT * FROM games';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games', async (req, res) => {
  try {
    let results = await fetchAllGames();
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No Games found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchGameByID(id) {
  let query = 'SELECT * FROM games WHERE id = ?';
  let response = await db.get(query, [id]);
  return { game: response };
}

app.get('/games/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchGameByID(id);
    if (results === undefined) {
      return res.status(404).json({ message: 'No Game found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchGamesByGenre(genre) {
  let query = 'SELECT * FROM games WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { games: response };
}

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  try {
    let results = await fetchGamesByGenre(genre);
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No Games found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchGamesByPlatform(platform) {
  let query = 'SELECT * FROM games WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { games: response };
}

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchGamesByPlatform(platform);
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No Games found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function sortGamesByRating() {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let results = await sortGamesByRating();
    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No Games found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchAllPlayers() {
  let query = 'SELECT * FROM players';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players', async (req, res) => {
  try {
    let results = await fetchAllPlayers();
    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No Players found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchPlayerByID(id) {
  let query = 'SELECT * FROM players WHERE id = ?';
  let response = await db.get(query, [id]);
  return { player: response };
}

app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchPlayerByID(id);
    if (results === undefined) {
      return res.status(404).json({ message: 'No Player found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchPlayersByPlatform(platform) {
  let query = 'SELECT * FROM players WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { players: response };
}

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchPlayersByPlatform(platform);
    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No players found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function sortPlayerByRating() {
  let query = 'SELECT * FROM players ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let results = await sortPlayerByRating();
    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No players found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchAllTournaments() {
  let query = 'SELECT * FROM tournaments';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments', async (req, res) => {
  try {
    let results = await fetchAllTournaments();
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: 'No Tournaments found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchTournamentByID(id) {
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let response = await db.get(query, [id]);
  return { tournament: response };
}

app.get('/tournaments/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchTournamentByID(id);
    if (results === undefined) {
      return res.status(404).json({ message: 'No Tournaments found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchTournamentByGameID(id) {
  let query = 'SELECT * FROM tournaments WHERE gameID = ?';
  let response = await db.get(query, [id]);
  return { tournaments: response };
}

app.get('/tournaments/game/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchTournamentByGameID(id);
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: 'No Tournament found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function sortTournamentByPrize() {
  let query = 'SELECT * FROM tournaments ORDER BY  prizePool DESC';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let results = await sortTournamentByPrize();
    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: 'No tournaments found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
