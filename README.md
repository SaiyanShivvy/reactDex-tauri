# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## TODO

- Remove global scrollbar and have a hidden scrollbar inside the pokemon list component.
- Remove Debounce
- Move out Generation handling from here to PokedexCard? tbh Genration selector is only for Moves.
- Display the Games + Generation Name
- Display a tabed table for each game/ game groups
- Test the GraphQL fetch for pokemon data.
- The evolution chain will probably be the hard and it might be easier to fetch the data using the chain url
  and rest api
- Rate limit internally so it doesn't do all calls instantly
