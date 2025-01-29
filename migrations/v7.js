import { describe , whereContent, whereFromPlugin, whereToPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

function getTextInputComponents(content) {
  return content.filter(({ _component }) => _component === 'textinput');
}

function hasKey(object, key) {
  if (!object) return false;
  return Object.hasOwn(object, key);
}

function setObjectPathValue(object, path, value, force = false) {
  if (!object) return;
  const paths = path.split('.');
  const key = paths.pop();
  const target = paths.reduce((o, p) => {
    if (!hasKey(o, p)) o[p] = {};
    return o?.[p];
  }, object);
  if (!force && hasKey(target, key)) return;
  target[key] = value;
}

/**
 * @todo Should we assume that a missing `instruction` should be added?
 */
describe('adapt-contrib-textInput - v2.0.0 to v7.2.0', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v2.0.0 to v7.2.0', { name: 'adapt-contrib-textInput', version: '<7.2.0'});
  let components;
  whereContent('adapt-contrib-textInput - where instruction default is empty', async content => {
    components = getTextInputComponents(content).filter(component => !hasKey(component, 'instruction') || component.instruction === '');
    return Boolean(components.length);
  });
  const newInstruction = 'Input your answer and select Submit.';
  mutateContent('adapt-contrib-textInput - update instruction default', async () => {
    components.forEach(component => component.instruction = newInstruction);
    return true;
  });
  checkContent('adapt-contrib-textInput - check instruction updated', async () => {
    const isValid = components.every(component => component.instruction === newInstruction);
    if (!isValid) throw new Error('instruction not updated');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v7.2.0', {name: 'adapt-contrib-textInput', version: '7.2.0', framework: '>=5.19.1'})
});

describe('adapt-contrib-textInput - v2.0.0 to v7.2.2', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v2.0.0 to v7.2.2', { name: 'adapt-contrib-textInput', version: '<7.2.2'});
  let components;
  whereContent('adapt-contrib-textInput - where missing ariaQuestion', async content => {
    components = getTextInputComponents(content).filter(component => !hasKey(component, 'ariaQuestion'));
    return Boolean(components.length);
  });
  mutateContent('adapt-contrib-textInput - add ariaQuestion', async () => {
    components.forEach(component => component.ariaQuestion = '');
    return true;
  });
  checkContent('adapt-contrib-textInput - check ariaQuestion added', async () => {
    const isValid = components.every(component => hasKey(component, 'ariaQuestion'));
    if (!isValid) throw new Error('ariaQuestion not added');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v7.2.2', {name: 'adapt-contrib-textInput', version: '7.2.2', framework: '>=5.19.1'})
});

/**
 * correct v1 schemas - legacy schema correct in v2.0.0 and updated in v3.0.0
 */
describe('adapt-contrib-textInput - v4.2.0 to v7.2.6', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v4.2.0 to v7.2.6', { name: 'adapt-contrib-textInput', version: '<7.2.6'});
  let course;
  mutateContent('adapt-contrib-textInput - update _globals ariaRegion', async content => {
    course = content.find(({ _type }) => _type === 'course');
    setObjectPathValue(course, '_globals._components._textInput.ariaRegion', 'Text input. Type your answer and then submit.');
    delete course?._globals?._textInput;
    return true;
  });
  checkContent('adapt-contrib-textInput - check _globals ariaRegion updated', async () => {
    const isValid = !hasKey(course._globals, '_textInput') && hasKey(course._globals._components._text, 'ariaRegion');
    if (!isValid) throw new Error('_globals ariaRegion default not updated');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v7.2.6', {name: 'adapt-contrib-text', version: '7.2.6', framework: '>=5.19.1'})
});

describe('adapt-contrib-textInput - v2.0.0 to v7.2.7', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v2.0.0 to v7.2.7', { name: 'adapt-contrib-textInput', version: '<7.2.7'});
  let components;
  whereContent('adapt-contrib-textInput - where missing altTitle', async content => {
    components = getTextInputComponents(content).filter(component => !hasKey(component._feedback, 'altTitle'));
    return Boolean(components.length);
  });
  mutateContent('adapt-contrib-textInput - add altTitle', async () => {
    components.forEach(component => setObjectPathValue(component, '_feedback.altTitle', ''));
    return true;
  });
  checkContent('adapt-contrib-textInput - check altTitle added', async () => {
    const isValid = components.every(component => hasKey(component._feedback, 'altTitle'));
    if (!isValid) throw new Error('altTitle not added');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v7.2.7', {name: 'adapt-contrib-textInput', version: '7.2.7', framework: '>=5.19.1'})
});

describe('adapt-contrib-textInput - v2.0.0 to v7.3.0', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v2.0.0 to v7.3.0', { name: 'adapt-contrib-textInput', version: '<7.3.0'});
  let course, components;
  whereContent('adapt-contrib-textInput - where has textInput plugin', async content => {
    course = content.find(({ _type }) => _type === 'course');
    components = getTextInputComponents(content);
    return true;
  });
  mutateContent('adapt-contrib-textInput - add correctAnswerPrefix', async () => {
    setObjectPathValue(course, '_globals._components._textInput.correctAnswerPrefix', 'The correct answer is');
    return true;
  });
  checkContent('adapt-contrib-textInput - check correctAnswerPrefix added', async () => {
    const isValid = hasKey(course?._globals?._components?._textInput, 'correctAnswerPrefix');
    if (!isValid) throw new Error('correctAnswerPrefix not added');
    return true;
  });
  mutateContent('adapt-contrib-textInput - add correctAnswersPrefix', async () => {
    setObjectPathValue(course, '_globals._components._textInput.correctAnswersPrefix', 'Accepted correct answers include');
    return true;
  });
  checkContent('adapt-contrib-textInput - check correctAnswersPrefix added', async () => {
    const isValid = hasKey(course?._globals?._components?._textInput, 'correctAnswersPrefix');
    if (!isValid) throw new Error('correctAnswersPrefix not added');
    return true;
  });
  mutateContent('adapt-contrib-textInput - add _canShowCorrectness', async () => {
    components.forEach(component => setObjectPathValue(component, '_canShowCorrectness', false));
    return true;
  });
  checkContent('adapt-contrib-textInput - check _canShowCorrectness added', async () => {
    const isValid = components.every(component => hasKey(component, '_canShowCorrectness'));
    if (!isValid) throw new Error('_canShowCorrectness not added');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v7.3.0', {name: 'adapt-contrib-textInput', version: '7.3.0', framework: '>=5.19.1'})
});