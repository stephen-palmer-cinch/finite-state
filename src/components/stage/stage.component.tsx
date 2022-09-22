import { useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "../../context/globalState";
import { PokemonState } from "../../stateMachine/types";
import { PlayerComponent } from "../player/player.component";
import { EnemyComponent } from "../enemy/enemy.component";
import { Stage } from "./styled";
import { ItemsComponent } from "../items/items.component";
import { PokemonComponent } from "../pokemon/pokemon.component";
import { EndScreenComponent } from "../endScreen/endScreen.component";

export const StageComponent = () => {
  const globalServices = useContext(GlobalStateContext);

  const [state, send] = useActor(globalServices.pokemonMachine);
  const {
    enemy_pokemon,
    selected_pokemon,
    player_dialogue,
    available_pokemon,
  } = state.context;
  const viewingMoves = state.matches(PokemonState.moves);

  const currentStageState = () => {
    if (state.matches(PokemonState.pokemon)) {
      return <PokemonComponent availablePokemon={available_pokemon} />;
    }
    if (state.matches(PokemonState.items)) {
      return <ItemsComponent />;
    }
    if (state.matches(PokemonState.victory)) {
      return <EndScreenComponent message={"You win!"} />;
    }
    if (state.matches(PokemonState.whited_out)) {
      return <EndScreenComponent message={"You lose, you should feel bad"} />;
    }
    if (state.matches(PokemonState.battle)) {
      return <EndScreenComponent message={"A wild Pokemon appeared!"} />;
    }
    return (
      <>
        <EnemyComponent enemyPokemon={enemy_pokemon} />
        <PlayerComponent
          selectedPokemon={selected_pokemon}
          playerDialogue={player_dialogue}
          send={send}
          viewingMoves={viewingMoves}
        />
      </>
    );
  };

  return <Stage>{currentStageState()}</Stage>;
};
