import { useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "../../../context/globalState";
import { PokemonEvents } from "../../../stateMachine/types";
import { CancelButton } from "./styled";

export const CancelComponent = () => {
  const globalServices = useContext(GlobalStateContext);

  const [, send] = useActor(globalServices.pokemonMachine);
  return (
    <CancelButton onClick={() => send(PokemonEvents.cancel)}>x</CancelButton>
  );
};
