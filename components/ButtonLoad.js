import { View } from 'react-native';
import { button_icon } from './styles/button';
import { useTheme } from '../utils/ThemeContext';
import { shadow_3dp } from './styles/theme';
import { useSavedSetModal } from '../utils/SavedSetModalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TooltipWrapper from './TooltipWrapper3';
import LoadSetModal from './modal/LoadSetModal';

const ButtonLoad = ({tooltip_text, screenSituation}) => {
  const th = useTheme();

  const {toggleSavedSetModal} = useSavedSetModal();

  return (
    <TooltipWrapper
      tooltipText={tooltip_text}
      style={[button_icon(th).container, shadow_3dp]}
      onPress={() => {
        toggleSavedSetModal(true);
      }}
    >
      <View>
        <MaterialCommunityIcons
          name="download"
          size={24}
          color={th.on_primary}
        />
        <LoadSetModal screenSituation={screenSituation}/>
      </View>
    </TooltipWrapper>
  );
};

export default ButtonLoad;
