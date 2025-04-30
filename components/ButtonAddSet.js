import { button_icon } from './styles/button';
import { useTheme } from '../utils/ThemeContext';
import { shadow_3dp } from './styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSetsList } from '../utils/SetsListContext';
import TooltipWrapper from './TooltipWrapper3';

const ButtonAddSet = () => {
  const th = useTheme();

  const {addSet} = useSetsList();

  return (
    <TooltipWrapper
      tooltipText="Ajouter un set"
      style={[button_icon(th).container, shadow_3dp]}
      onPress={() => addSet()}
    >
      <MaterialCommunityIcons name="plus" size={24} color={th.on_primary}/>
    </TooltipWrapper>
  );
};

export default ButtonAddSet;
