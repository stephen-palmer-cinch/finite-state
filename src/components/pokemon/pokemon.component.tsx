import { useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "../../context/globalState";
import { Pokemon, PokemonEvents } from "../../stateMachine/types";
import { CancelComponent } from "../shared/cancel/cancel.component";
import {
  AvailablePokemonContainer,
  AvailablePokemonRow,
  AvailablePokemonSprite,
} from "./styled";

type PokemonComponentType = {
  availablePokemon: Pokemon[];
};

export const PokemonComponent = ({
  availablePokemon,
}: PokemonComponentType) => {
  const globalServices = useContext(GlobalStateContext);

  const [, send] = useActor(globalServices.pokemonMachine);
  return (
    <AvailablePokemonContainer>
      {availablePokemon.map((pokemon, index) => {
        return (
          <AvailablePokemonRow
            key={pokemon.name}
            onClick={() =>
              send({ type: PokemonEvents.pokemon_selected, payload: index })
            }
          >
            <div>{pokemon.name}</div>
            <div>Lvl {pokemon.level}</div>
            <div>
              {pokemon.currentHp} / {pokemon.totalHp}
            </div>
            <AvailablePokemonSprite src={pokemon.sprite} />
          </AvailablePokemonRow>
        );
      })}
      <CancelComponent />
    </AvailablePokemonContainer>
  );
};
