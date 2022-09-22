import { Enemy } from "./styled";
import { NameComponent } from "../shared/name/name.component";
import { SpriteComponent } from "./sprite/sprite.component";
import { Pokemon } from "../../stateMachine/types";

type EnemyComponentProps = {
  enemyPokemon: Pokemon;
};

export const EnemyComponent = ({ enemyPokemon }: EnemyComponentProps) => {
  return (
    <Enemy>
      <NameComponent
        name={enemyPokemon.name}
        currentHp={enemyPokemon.currentHp}
        totalHp={enemyPokemon.totalHp}
        level={enemyPokemon.level}
      />
      <SpriteComponent sprite={enemyPokemon.sprite} name={enemyPokemon.name} />
    </Enemy>
  );
};
