import {
  CurrentHealth,
  HealthBar,
  HealthNumber,
  Level,
  NameContainer,
  NameTitle,
  NameWrapper,
} from "./styled";

type NameComponentProps = {
  name: string;
  currentHp: number;
  totalHp: number;
  level: number;
  style?: any;
};
export const NameComponent = ({
  name,
  currentHp,
  totalHp,
  level,
  style,
}: NameComponentProps) => {
  const hpAsPercentage = (currentHp / totalHp) * 100;
  return (
    <NameContainer style={style}>
      <NameWrapper>
        <NameTitle>{name}</NameTitle>
        <Level>Lvl {level}</Level>
      </NameWrapper>
      <HealthBar>
        <CurrentHealth style={{ width: `${hpAsPercentage}%` }}></CurrentHealth>
      </HealthBar>
      <HealthNumber>
        {currentHp} / {totalHp}
      </HealthNumber>
    </NameContainer>
  );
};
