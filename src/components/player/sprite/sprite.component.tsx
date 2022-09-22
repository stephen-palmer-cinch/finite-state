import { SpriteContainer, SpriteImage } from "./styled";
import { charmander } from "../../../stateMachine/types";
export const SpriteComponent = () => {
  return (
    <SpriteContainer>
      <SpriteImage src={charmander.sprite} alt={charmander.name} />
    </SpriteContainer>
  );
};
