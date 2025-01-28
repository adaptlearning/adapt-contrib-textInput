import { describe , whereContent, whereFromPlugin, whereToPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

function getTextInputComponents(content) {
  return content.filter(({ _component }) => _component === 'textinput');
}

function hasKey(object, key) {
  if (!object) return false;
  return Object.hasOwn(object, key);
}

describe('adapt-contrib-textInput - v1.0.0 to v2.0.2', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v1.0.0 to v2.0.2', { name: 'adapt-contrib-textInput', version: '<2.0.2'});
  let components;
  whereContent('adapt-contrib-textInput - where missing _recordInteraction', async content => {
    components = getTextInputComponents(content).filter(component => !hasKey(component, '_recordInteraction'));
    return Boolean(components.length);
  });
  mutateContent('adapt-contrib-textInput - add _recordInteraction', async () => {
    components.forEach(component => component._recordInteraction = true);
    return true;
  });
  checkContent('adapt-contrib-textInput - check _recordInteraction added', async () => {
    const isValid = components.every(component => hasKey(component, '_recordInteraction'));
    if (!isValid) throw new Error('_recordInteraction not added');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v2.0.2', {name: 'adapt-contrib-textInput', version: '2.0.2', framework: '>=2.0.0'})
});

describe('adapt-contrib-textInput - v1.0.0 to v2.0.4', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v1.0.0 to v2.0.4', { name: 'adapt-contrib-textInput', version: '<2.0.4'});
  let components;
  whereContent('adapt-contrib-textInput - where missing _canShowModelAnswer', async content => {
    components = getTextInputComponents(content).filter(component => !hasKey(component, '_canShowModelAnswer'));
    return Boolean(components.length);
  });
  mutateContent('adapt-contrib-textInput - add _canShowModelAnswer', async () => {
    components.forEach(component => component._canShowModelAnswer = true);
    return true;
  });
  checkContent('adapt-contrib-textInput - check _canShowModelAnswer added', async () => {
    const isValid = components.every(component => hasKey(component, '_canShowModelAnswer'));
    if (!isValid) throw new Error('_canShowModelAnswer not added');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v2.0.4', {name: 'adapt-contrib-textInput', version: '2.0.4', framework: '>=2.0.0'})
});

/**
 * @todo Can we assume that these don't need to be run independantly and that if the first `whereContent` fails, the other attributes won't need to be added either? Should always be the case for AAT but not necessarily for framework.
 */
describe('adapt-contrib-textInput - v1.0.0 to v2.0.5', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v1.0.0 to v2.0.5', { name: 'adapt-contrib-textInput', version: '<2.0.5'});
  let components;
  whereContent('adapt-contrib-textInput - where missing _canShowModelAnswer', async content => {
    components = getTextInputComponents(content).filter(component => !hasKey(component, '_canShowFeedback'));
    return Boolean(components.length);
  });
  mutateContent('adapt-contrib-textInput - add _canShowFeedback', async () => {
    components.forEach(component => component._canShowFeedback = true);
    return true;
  });
  checkContent('adapt-contrib-textInput - check _canShowFeedback added', async () => {
    const isValid = components.every(component => hasKey(component, '_canShowFeedback'));
    if (!isValid) throw new Error('_canShowFeedback not added');
    return true;
  });
  whereContent('adapt-contrib-textInput - where missing _canShowMarking', async content => {
    components = getTextInputComponents(content).filter(component => !hasKey(component, '_canShowMarking'));
    return Boolean(components.length);
  });
  mutateContent('adapt-contrib-textInput - add _canShowMarking', async () => {
    components.forEach(component => component._canShowFeedback = true);
    return true;
  });
  checkContent('adapt-contrib-textInput - check _canShowMarking added', async () => {
    const isValid = components.every(component => hasKey(component, '_canShowMarking'));
    if (!isValid) throw new Error('_canShowMarking not added');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v2.0.5', {name: 'adapt-contrib-textInput', version: '2.0.5', framework: '>=2.0.11'})
});

describe('adapt-contrib-textInput - v1.0.0 to v2.1.0', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v1.0.0 to v2.1.0', { name: 'adapt-contrib-textInput', version: '<2.1.0'});
  let course;
  whereContent('adapt-contrib-textInput - where using old _globals ariaRegion default', async content => {
    course = content.find(({ _type }) => _type === 'course');
    const oldAriaRegion = 'This question component requires you to input your answer in the textbox provided. When you have answered the question select the submit button below.';
    return !hasKey(course?._globals?._components?._textInput, 'ariaRegion') || course?._globals?._components?._textInput?.ariaRegion === oldAriaRegion;
  });
  const newAriaRegion = 'This question requires you to input your answer in the textbox provided. When you have done so, select the submit button below.';
  mutateContent('adapt-contrib-textInput - update _globals ariaRegion default', async () => {
    if (!course._globals) course._globals = {};
    if (!course._globals._components) course._globals._components = {};
    if (!course._globals._components._textInput) course._globals._components._textInput = {};
    course._globals._components._textInput.ariaRegion = newAriaRegion;
    return true;
  });
  checkContent('adapt-contrib-textInput - check _globals ariaRegion default updated', async () => {
    const isValid = course._globals._components._textInput.ariaRegion === newAriaRegion;
    if (!isValid) throw new Error('_globals ariaRegion default not updated');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v2.1.0', {name: 'adapt-contrib-text', version: '2.1.0', framework: '>=2.0.11'})
});

describe('adapt-contrib-textInput - v1.0.0 to v2.2.0', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v1.0.0 to v2.2.0', { name: 'adapt-contrib-textInput', version: '<2.2.0'});
  let components;
  whereContent('adapt-contrib-textInput - where missing _feedback.title', async content => {
    components = getTextInputComponents(content).filter(component => !hasKey(component._feedback, 'title'));
    return Boolean(components.length);
  });
  mutateContent('adapt-contrib-textInput - add _feedback.title', async () => {
    components.forEach(component => component._feedback.title = 'Feedback title');
    return true;
  });
  checkContent('adapt-contrib-textInput - check _feedback.title added', async () => {
    const isValid = components.every(component => hasKey(component._feedback, 'title'));
    if (!isValid) throw new Error('_feedback.title not added');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v2.2.0', {name: 'adapt-contrib-textInput', version: '2.2.0', framework: '>=2.0.11'})
});