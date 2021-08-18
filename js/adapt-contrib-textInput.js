import Adapt from 'core/js/adapt';
import TextInputView from './textInputView';
import TextInputModel from './textInputModel';

export default Adapt.register('textinput', {
  view: TextInputView,
  model: TextInputModel
});
