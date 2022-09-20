import { NameComponent } from "./name/name.component";
import { SpriteComponent } from "./sprite/sprite.component";
import { Enemy } from "./styled";

export const EnemyComponent = () => {
  return (
    <Enemy>
      <SpriteComponent />
      <NameComponent />
    </Enemy>
  );
};
