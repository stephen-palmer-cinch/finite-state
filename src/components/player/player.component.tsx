import { useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "../../context/globalState";
import { ActionsComponent } from "./actions/actions.component";
import { DialogueComponent } from "./dialogue/dialogue.component";
import { NameComponent } from "../shared/name/name.component";
import { SpriteComponent } from "./sprite/sprite.component";
import { Player, PlayerContainer } from "./styled";
import { Events } from "../../stateMachine/types";

export const PlayerComponent = () => {
  const globalServices = useContext(GlobalStateContext);

  const [
    {
      context: { selected_pokemon, player_dialogue },
    },
    send,
  ] = useActor(globalServices.pokemonMachine);

  return (
    <Player>
      <PlayerContainer>
        <SpriteComponent
          sprite={selected_pokemon.sprite}
          name={selected_pokemon.name}
        />
        <DialogueComponent dialogue={player_dialogue} />
      </PlayerContainer>
      <PlayerContainer>
        <NameComponent
          name={selected_pokemon.name}
          currentHp={selected_pokemon.currentHp}
          totalHp={selected_pokemon.totalHp}
          level={selected_pokemon.level}
        />
        <ActionsComponent
          movesAction={() => send(Events.moves)}
          itemsAction={() => send(Events.items)}
          pokemonAction={() => send(Events.pokemon)}
          runAction={() => send(Events.run)}
        />
      </PlayerContainer>
    </Player>
  );
};
