import { AnyEventObject, assign, createMachine } from "xstate";

type Move = {
  name: string;
  damage: number;
};

type Pokemon = {
  name: string;
  totalHp: number;
  currentHp: number;
  moves: Move[];
};

interface SelectedMove extends AnyEventObject {
  move?: Move;
}

export interface PokemonContext {
  selected_pokemon: Pokemon;
  available_pokemon: Pokemon[];
  enemy_pokemon: Pokemon;
}

export enum Events {
  walk = "WALK",
  encounter = "ENCOUNTER",
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
  idle = "idle",
  walking = "walking",
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

const gameEvents = {} as
  | { type: Events.walk }
  | { type: Events.encounter }
  | { type: Events.your_turn }
  | { type: Events.their_turn }
  | { type: Events.pokemon }
  | { type: Events.select_next_pokemon }
  | { type: Events.pokemon_selected }
  | { type: Events.cancel }
  | { type: Events.items }
  | { type: Events.moves }
  | { type: Events.move_selected }
  | { type: Events.run }
  | { type: Events.poke_ball }
  | { type: Events.enemy_attack }
  | { type: Events.damage_taken }
  | { type: Events.success }
  | { type: Events.failure };

const pikachu: Pokemon = {
  name: "Pikachu",
  totalHp: 120,
  currentHp: 120,
  moves: [
    { name: "takle", damage: 40 },
    { name: "thunderbolt", damage: 60 },
  ],
};

const charmander: Pokemon = {
  name: "Charmander",
  totalHp: 140,
  currentHp: 140,
  moves: [
    { name: "takle", damage: 40 },
    { name: "ember", damage: 50 },
  ],
};

const pidgey: Pokemon = {
  name: "Pidgey",
  totalHp: 100,
  currentHp: 100,
  moves: [
    { name: "takle", damage: 30 },
    { name: "gust", damage: 40 },
  ],
};

export const pokemonBattleMachine = createMachine(
  {
    id: "smilesState",
    initial: "idle",
    predictableActionArguments: true,
    schema: {
      context: {} as PokemonContext,
      events: gameEvents,
    },
    context: {
      selected_pokemon: pikachu,
      available_pokemon: [charmander],
      enemy_pokemon: pidgey,
    },
    states: {
      idle: {
        on: {
          WALK: { target: "walking" },
        },
      },
      walking: {
        on: {
          ENCOUNTER: { target: "battle" },
        },
      },
      battle: {
        after: {
          1000: { target: "your_turn" },
        },
      },
      your_turn: {
        on: {
          MOVES: { target: "moves" },
          ITEMS: { target: "items" },
          POKEMON: { target: "pokemon" },
          RUN: { target: "run" },
        },
      },
      their_turn: {
        on: {
          ENEMY_ATTACK: {
            target: "player_damage_step",
            actions: "playerDamage",
          },
        },
      },
      moves: {
        on: {
          MOVE_SELECTED: {
            target: "enemy_damage_step",
            actions: "enemyDamage",
          },
          CANCEL: { target: "your_turn" },
        },
      },
      items: {
        on: {
          POKE_BALL: { target: "catching" },
          CANCEL: { target: "your_turn" },
        },
      },
      pokemon: {
        on: {
          POKEMON_SELECTED: { target: "their_turn", actions: "switchPokemon" },
          CANCEL: { target: "your_turn" },
        },
      },
      run: {
        on: { SUCCESS: { target: "idle" }, FAILURE: { target: "their_turn" } },
      },
      catching: {
        on: {
          SUCCESS: { target: "victory" },
          FAILURE: { target: "their_turn" },
        },
      },
      enemy_damage_step: {
        on: {
          DAMAGE_TAKEN: [
            {
              target: "victory",
              cond: (context) => context.enemy_pokemon.currentHp < 1,
            },
            {
              target: "their_turn",
            },
          ],
        },
      },
      player_damage_step: {
        on: {
          DAMAGE_TAKEN: [
            {
              target: "feint",
              cond: (context) => context.selected_pokemon.currentHp < 1,
            },
            {
              target: "your_turn",
            },
          ],
        },
      },
      feint: {
        on: {
          SELECT_NEXT_POKEMON: [
            {
              target: "whited_out",
              cond: (context) => context.available_pokemon.length < 1,
            },
            {
              target: "pokemon",
            },
          ],
        },
      },
      victory: { type: "final" },
      whited_out: { type: "final" },
    },
  },
  {
    actions: {
      switchPokemon: () =>
        assign({
          selected_pokemon: (context, event: { pokemon: Pokemon }) =>
            event.pokemon,
        }),
      playerDamage: () =>
        assign({
          selected_pokemon: (
            context: Pick<PokemonContext, "selected_pokemon">,
            event: SelectedMove
          ) => {
            const damage = event.move?.damage || 0;
            return {
              ...context.selected_pokemon,
              currentHp: context.selected_pokemon.currentHp - damage,
            };
          },
        }),
      enemyDamage: () =>
        assign({
          enemy_pokemon: (context, event: Pokemon) => event,
        }),
    },
  }
);
