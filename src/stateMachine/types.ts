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
  enemy_dialogue: string;
}

export enum Events {
  your_turn = "YOUR_TURN",
  their_turn = "THEIR_TURN",
  pokemon = "POKEMON",
  select_next_pokemon = "SELECT_NEXT_POKEMON",
  pokemon_selected = "POKEMON_SELECTED",
  cancel = "CANCEL",
  items = "ITEMS",
  moves = "MOVES",
  move_selected = "MOVE_SELECTED",
  run = "RUN",
  poke_ball = "POKE_BALL",
  enemy_attack = "ENEMY_ATTACK",
  damage_taken = "DAMAGE_TAKEN",
  success = "SUCCESS",
  failure = "FAILURE",
}

export enum State {
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
  type: Events.pokemon_selected;
  payload: number;
}

export interface MoveSelectedEvent {
  type: Events.move_selected;
  payload: number;
}

export interface EnemyAttackEvent {
  type: Events.enemy_attack;
  payload: number;
}

export type GameEvents =
  | { type: Events.your_turn }
  | { type: Events.their_turn }
  | { type: Events.pokemon }
  | { type: Events.select_next_pokemon }
  | SelectedPokemonEvent
  | { type: Events.cancel }
  | { type: Events.items }
  | { type: Events.moves }
  | MoveSelectedEvent
  | { type: Events.run }
  | { type: Events.poke_ball }
  | EnemyAttackEvent
  | { type: Events.damage_taken }
  | { type: Events.success }
  | { type: Events.failure };

export const pikachu: Pokemon = {
  name: "Pikachu",
  totalHp: 120,
  currentHp: 120,
  moves: [
    { name: "takle", damage: 40 },
    { name: "thunderbolt", damage: 60 },
    { name: "growl", damage: 0 },
  ],
  sprite: pikachuSprite,
  level: 5,
};

export const charmander: Pokemon = {
  name: "Charmander",
  totalHp: 140,
  currentHp: 140,
  moves: [
    { name: "takle", damage: 40 },
    { name: "ember", damage: 50 },
  ],
  sprite: charmanderSprite,
  level: 5,
};

export const pidgey: Pokemon = {
  name: "Pidgey",
  totalHp: 100,
  currentHp: 100,
  moves: [
    { name: "takle", damage: 30 },
    { name: "gust", damage: 40 },
  ],
  sprite: pidgeySprite,
  level: 4,
};
