import { ActionsComponent } from "./actions/actions.component";
import { DialogueComponent } from "./dialogue/dialogue.component";
import { NameComponent } from "./name/name.component";
import { SpriteComponent } from "./sprite/sprite.component";
import { Player, PlayerContainer } from "./styled";

export const PlayerComponent = () => {
  return (
    <Player>
      <PlayerContainer>
        <SpriteComponent />
        <DialogueComponent />
      </PlayerContainer>
      <PlayerContainer>
        <NameComponent />
        <ActionsComponent />
      </PlayerContainer>
    </Player>
  );
};
