import { SpriteContainer, SpriteImage } from "./styled";

type SpriteComponentProps = {
  sprite: string;
  name: string;
};
export const SpriteComponent = ({ sprite, name }: SpriteComponentProps) => {
  return (
    <SpriteContainer>
      <SpriteImage src={sprite} alt={name} />
    </SpriteContainer>
  );
};
