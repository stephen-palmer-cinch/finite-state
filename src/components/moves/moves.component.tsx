import { useContext } from "react";
import { useActor } from "@xstate/react";
import { Move, PokemonEvents } from "../../stateMachine/types";
import { CancelComponent } from "../shared/cancel/cancel.component";
import { MoveButton, MoveContainer } from "./styled";
import { GlobalStateContext } from "../../context/globalState";

type MovesComponentProps = {
  moves: Move[];
};

export const MovesComponent = ({ moves }: MovesComponentProps) => {
  const globalServices = useContext(GlobalStateContext);

  const [, send] = useActor(globalServices.pokemonMachine);
  return (
    <>
      <MoveContainer>
        {moves.map((move, index) => {
          return (
            <MoveButton
              key={move.name}
              onClick={() =>
                send({ type: PokemonEvents.move_selected, payload: index })
              }
            >
              {move.name}
            </MoveButton>
          );
        })}
      </MoveContainer>
      <CancelComponent />
    </>
  );
};
