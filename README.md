# Magic The Gathering Card and Deck Frontend
[![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white)](#)
[![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](#)
[![Angular CLI](https://img.shields.io/badge/Angular_CLI-DD0031?logo=angular&logoColor=white)](#)
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)](#)

A local Angular UI for managing Magic: The Gathering cards and decks.
This frontend communicates with the companion Flask REST API to fetch, manage, and display card/deck data.

This project was created as part of a capstone project and is still a work in progress.

Backend repo: 👉 [MTG Card & Deck Manager API](https://github.com/EricBrown589/NCLab-Python-Capstone-Backend)

## Features

* Cards
  * Browse all cards with client-side filters (colors, type)
  * Add cards by exact name (via backend → Scryfall API)
  * Update amount_owned
  * Delete cards (only when amount_owned = 0)
* Decks
  * Create and delete decks
  * Add cards to decks (by name)
  * View all cards in a deck
* Quality of Life
  * Responsive UI built in Angular
  * Instant UI updates when data changes (Angular change detection)
 
## Requirements

* Angular CLI: 20.1.5
* Node.js: 22.18.0
* npm: 10.9.3
* A running backend API at ```http://127.0.0.1:5000/``` (Flask with CORS enabled)

Install frontend dependencies: ```npm install```

## How to Run Locally

1. Start the backend (Flask API)
    * Follow setup in the backend README
    * Ensure it runs at ```http://127.0.0.1:5000/```
2. Start the frontend
    * ```npm install```
    * ```npm start``` or ```ng serve```

Open: 👉 ```http://localhost:4200/```

## Project Structure

```
src/app
│   app.ts                # Root Angular module
│   app.routes.ts         # Application routes (cards, decks, home, etc.)
│   app.html              # Root application template
│   app.css               # Global styles for the app
│   app.config.ts         # App-wide configuration
│   app.spec.ts           # Unit tests for root app
│
│   data-service.ts       # Service handling HTTP requests to the Flask API
│   data-service.spec.ts  # Tests for data service
│
└── components/
    ├── cards-page/       # Card list, filter, add/update/delete
    ├── deck-page/        # Deck list and management
    ├── deck-cards/       # View cards in a deck, add cards
    ├── home-page/        # Landing page
    └── navbar/           # Navbar with navigation links
```

## Future Work / Roadmap

Planned Improvement:
* Better search/filter controls
* Support searching and returning multiple matches
* Clearer error messages
* Create an interactive and enjoyable home/landing page
* Add styling throughout to create a fun and welcoming application

Long-Term Ideas:
* Adding authentication and users
* Deploying and hosting somewhere

## Known Issues / Limitations

* Home/Landing page is blank
* Cards can only be deleted when amount_owned = 0
* Multi-faced cards are not fully supported yet
* Image sizes from Scryfall can be inconsistent
* Can only retrieve a card from Scryfall by exact name
* Minimal client-side validation (relies on backend rules)
* Can not easily add multiple of the same card to a deck
* Can not remove cards from a deck

## Status

🚧 Capstone project — work in progress 🚧 

Features and UI are subject to change as development continues
