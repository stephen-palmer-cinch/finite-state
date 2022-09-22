import { ActionComponent } from "./action/action.component";
import { ActionsContainer, ActionsRow } from "./styled";

export const ActionsComponent = () => {
  return (
    <ActionsContainer>
      <ActionsRow>
        <ActionComponent name={"Moves"} />
        <ActionComponent name={"Items"} />
      </ActionsRow>
      <ActionsRow>
        <ActionComponent name={"Pokemon"} />
        <ActionComponent name={"Run"} />
      </ActionsRow>
    </ActionsContainer>
  );
};
