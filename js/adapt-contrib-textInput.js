import components from 'core/js/components';
import TextInputView from './textInputView';
import TextInputModel from './textInputModel';

export default components.register('textinput', {
  view: TextInputView,
  model: TextInputModel
});
