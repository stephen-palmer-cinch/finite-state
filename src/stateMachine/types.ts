import pikachuSprite from "../assets/pikachu.png";
import charmanderSprite from "../assets/charmander.png";
import pidgeySprite from "../assets/pidgey.png";

export type Move = {
  name: string;
  damage: number;
};

export type Pokemon = {
  name: string;
  totalHp: number;
  currentHp: number;
  moves: Move[];
  sprite: string;
  level: number;
};

export interface PokemonContext {
  selected_pokemon: Pokemon;
  available_pokemon: Pokemon[];
  enemy_pokemon: Pokemon;
  player_dialogue: string;
}

export enum PokemonEvents {
  your_turn = "YOUR_TURN",
  their_turn = "THEIR_TURN",
  pokemon = "POKEMON",
  pokemon_selected = "POKEMON_SELECTED",
  cancel = "CANCEL",
  items = "ITEMS",
  moves = "MOVES",
  move_selected = "MOVE_SELECTED",
  run = "RUN",
  poke_ball = "POKE_BALL",
  success = "SUCCESS",
  failure = "FAILURE",
}

export enum PokemonState {
  battle = "battle",
  your_turn = "your_turn",
  their_turn = "their_turn",
  moves = "moves",
  items = "items",
  pokemon = "pokemon",
  run = "run",
  catching = "catching",
  enemy_damage_step = "enemy_damage_step",
  player_damage_step = "player_damage_step",
  feint = "feint",
  victory = "victory",
  whited_out = "whited_out",
}

export interface SelectedPokemonEvent {
  type: PokemonEvents.pokemon_selected;
  payload: number;
}

export interface MoveSelectedEvent {
  type: PokemonEvents.move_selected;
  payload: number;
}

export type GameEvents =
  | { type: PokemonEvents.your_turn }
  | { type: PokemonEvents.their_turn }
  | { type: PokemonEvents.pokemon }
  | SelectedPokemonEvent
  | { type: PokemonEvents.cancel }
  | { type: PokemonEvents.items }
  | { type: PokemonEvents.moves }
  | MoveSelectedEvent
  | { type: PokemonEvents.run }
  | { type: PokemonEvents.poke_ball }
  | { type: PokemonEvents.success }
  | { type: PokemonEvents.failure };

export const pikachu: Pokemon = {
  name: "Pikachu",
  totalHp: 120,
  currentHp: 120,
  moves: [
    { name: "Tackle", damage: 40 },
    { name: "Thunderbolt", damage: 60 },
    { name: "Growl", damage: 0 },
  ],
  sprite: pikachuSprite,
  level: 5,
};

export const charmander: Pokemon = {
  name: "Charmander",
  totalHp: 140,
  currentHp: 140,
  moves: [
    { name: "Tackle", damage: 40 },
    { name: "Ember", damage: 50 },
    { name: "Leer", damage: 0 },
  ],
  sprite: charmanderSprite,
  level: 5,
};

export const pidgey: Pokemon = {
  name: "Pidgey",
  totalHp: 100,
  currentHp: 100,
  moves: [
    { name: "Tackle", damage: 30 },
    { name: "Gust", damage: 40 },
  ],
  sprite: pidgeySprite,
  level: 4,
};
