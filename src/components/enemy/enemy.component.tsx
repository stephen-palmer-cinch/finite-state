import { useContext } from "react";
import { useActor } from "@xstate/react";
import { Enemy } from "./styled";
import { GlobalStateContext } from "../../context/globalState";
import { NameComponent } from "../shared/name/name.component";
import { SpriteComponent } from "./sprite/sprite.component";

export const EnemyComponent = () => {
  const globalServices = useContext(GlobalStateContext);

  const [
    {
      context: { enemy_pokemon },
    },
  ] = useActor(globalServices.pokemonMachine);
  return (
    <Enemy>
      <NameComponent
        name={enemy_pokemon.name}
        currentHp={enemy_pokemon.currentHp}
        totalHp={enemy_pokemon.totalHp}
        level={enemy_pokemon.level}
      />
      <SpriteComponent
        sprite={enemy_pokemon.sprite}
        name={enemy_pokemon.name}
      />
    </Enemy>
  );
};
