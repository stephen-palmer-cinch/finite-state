import { ActionsComponent } from "./actions/actions.component";
import { DialogueComponent } from "./dialogue/dialogue.component";
import { NameComponent } from "../shared/name/name.component";
import { SpriteComponent } from "./sprite/sprite.component";
import { Player, PlayerContainer } from "./styled";
import { PokemonEvents, Pokemon } from "../../stateMachine/types";
import { MovesComponent } from "../moves/moves.component";

type PlayerComponentProps = {
  selectedPokemon: Pokemon;
  playerDialogue: string;
  send: any;
  viewingMoves: boolean;
};

export const PlayerComponent = ({
  selectedPokemon,
  playerDialogue,
  send,
  viewingMoves,
}: PlayerComponentProps) => {
  return (
    <Player>
      <PlayerContainer>
        <SpriteComponent
          sprite={selectedPokemon.sprite}
          name={selectedPokemon.name}
        />
        <DialogueComponent dialogue={playerDialogue} />
      </PlayerContainer>
      <PlayerContainer>
        <NameComponent
          name={selectedPokemon.name}
          currentHp={selectedPokemon.currentHp}
          totalHp={selectedPokemon.totalHp}
          level={selectedPokemon.level}
        />
        {viewingMoves ? (
          <MovesComponent moves={selectedPokemon.moves} />
        ) : (
          <ActionsComponent
            movesAction={() => send(PokemonEvents.moves)}
            itemsAction={() => send(PokemonEvents.items)}
            pokemonAction={() => send(PokemonEvents.pokemon)}
            runAction={() => send(PokemonEvents.run)}
          />
        )}
      </PlayerContainer>
    </Player>
  );
};
