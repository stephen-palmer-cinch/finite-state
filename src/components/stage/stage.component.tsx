import { PlayerComponent } from "../player/player.component";
import { EnemyComponent } from "../enemy/enemy.component";
import { Stage } from "./styled";

export const StageComponent = () => {
  return (
    <Stage>
      <EnemyComponent />
      <PlayerComponent />
    </Stage>
  );
};
