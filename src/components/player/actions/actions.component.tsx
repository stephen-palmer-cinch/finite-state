import { ActionComponent } from "./action/action.component";
import { ActionsContainer, ActionsRow } from "./styled";

type ActionsComponentProps = {
  movesAction: () => void;
  itemsAction: () => void;
  pokemonAction: () => void;
  runAction: () => void;
};
export const ActionsComponent = ({
  movesAction,
  itemsAction,
  pokemonAction,
  runAction,
}: ActionsComponentProps) => {
  return (
    <ActionsContainer>
      <ActionsRow>
        <ActionComponent name={"Moves"} action={() => movesAction()} />
        {/* <ActionComponent name={"Items"} action={() => itemsAction()} /> */}
      </ActionsRow>
      <ActionsRow>
        <ActionComponent name={"Pokemon"} action={() => pokemonAction()} />
        {/* <ActionComponent name={"Run"} action={() => runAction()} /> */}
      </ActionsRow>
    </ActionsContainer>
  );
};
