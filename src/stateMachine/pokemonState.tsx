import { assign, createMachine } from "xstate";
import {
  PokemonContext,
  gameEvents,
  pidgey,
  pikachu,
  charmander,
  Pokemon,
  SelectedMove,
} from "./types";

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
          POKEMON_SELECTED: { actions: "switchPokemon", target: "their_turn" },
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
      //this one works
      switchPokemon: assign((context, event: any) => {
        return { selected_pokemon: context.available_pokemon[0] };
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
