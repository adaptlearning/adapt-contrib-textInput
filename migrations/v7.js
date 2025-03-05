import {
  describe,
  whereFromPlugin,
  whereContent,
  mutateContent,
  checkContent,
  updatePlugin,
  getCourse,
  getComponents,
  testStopWhere,
  testSuccessWhere
} from 'adapt-migrations';
import _ from 'lodash';

/**
 * @todo Should we assume that a missing `instruction` should be added?
 */
describe('adapt-contrib-textInput - to v7.2.0', async () => {
  let components;
  const newInstruction = 'Input your answer and select Submit.';

  whereFromPlugin('adapt-contrib-textInput - from <v7.2.0', { name: 'adapt-contrib-textInput', version: '<7.2.0' });

  whereContent('adapt-contrib-textInput - where instruction default is empty', async () => {
    components = getComponents('textinput').filter(component => !_.has(component, 'instruction') || component.instruction === '');
    return components.length;
  });

  mutateContent('adapt-contrib-textInput - update instruction default', async () => {
    components.forEach(component => {
      component.instruction = newInstruction;
    });
    return true;
  });

  checkContent('adapt-contrib-textInput - check instruction updated', async () => {
    const isValid = components.every(component => component.instruction === newInstruction);
    if (!isValid) throw new Error('instruction not updated');
    return true;
  });

  updatePlugin('adapt-contrib-textInput - update to v7.2.0', { name: 'adapt-contrib-textInput', version: '7.2.0', framework: '>=5.19.1' });

  testSuccessWhere('textInput multiple components with/without instruction', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.1.0' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _id: 'c-105', _component: 'textinput', instruction: { title: 'title' } },
      { _id: 'c-110', _component: 'textinput', instruction: '' },
      { _id: 'c-115', _component: 'textinput' }
    ]
  });

  testStopWhere('no textInput components', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.1.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.0' }]
  });
});

describe('adapt-contrib-textInput - to v7.2.2', async () => {
  let components;

  whereFromPlugin('adapt-contrib-textInput - from <v7.2.2', { name: 'adapt-contrib-textInput', version: '<7.2.2' });

  whereContent('adapt-contrib-textInput - where missing ariaQuestion', async () => {
    components = getComponents('textinput').filter(component => !_.has(component, 'ariaQuestion'));
    return components.length;
  });

  mutateContent('adapt-contrib-textInput - add ariaQuestion', async () => {
    components.forEach(component => {
      component.ariaQuestion = '';
    });
    return true;
  });

  checkContent('adapt-contrib-textInput - check ariaQuestion added', async () => {
    const isValid = components.every(component => _.has(component, 'ariaQuestion'));
    if (!isValid) throw new Error('ariaQuestion not added');
    return true;
  });

  updatePlugin('adapt-contrib-textInput - update to v7.2.2', { name: 'adapt-contrib-textInput', version: '7.2.2', framework: '>=5.19.1' });

  testSuccessWhere('textInput multiple components with/without ariaQuestion', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.1' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _id: 'c-105', _component: 'textinput' },
      { _id: 'c-110', _component: 'textinput', ariaQuestion: '' }
    ]
  });

  testStopWhere('no textInput components', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.1' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.2' }]
  });
});

/**
 * correct v1 schemas - legacy schema correct in v2.0.0 and updated in v3.0.0
 */
describe('adapt-contrib-textInput - v4.2.0 to v7.2.6', async () => {
  let course;
  const incorrectGlobalsTextInputPath = '_globals._textInput';
  const ariaRegionPath = '_globals._components._textInput.ariaRegion';

  whereFromPlugin('adapt-contrib-textInput - from v4.2.0 to v7.2.6', { name: 'adapt-contrib-textInput', version: '>=4.2.0 <7.2.6' });

  whereContent('adapt-contrib-text - where missing correct _globals ariaRegion', async () => {
    course = getCourse();
    return !_.has(course, ariaRegionPath);
  });

  mutateContent('adapt-contrib-textInput - update _globals ariaRegion', async () => {
    if (!_.has(course, ariaRegionPath)) _.set(course, ariaRegionPath, 'Text input. Type your answer and then submit.');
    _.unset(course, incorrectGlobalsTextInputPath);
    return true;
  });

  checkContent('adapt-contrib-textInput - check _globals ariaRegion updated', async () => {
    const isValid = !_.has(course, incorrectGlobalsTextInputPath) && _.has(course, ariaRegionPath);
    if (!isValid) throw new Error(`${ariaRegionPath} default not updated`);
    return true;
  });

  updatePlugin('adapt-contrib-textInput - update to v7.2.6', { name: 'adapt-contrib-text', version: '7.2.6', framework: '>=5.19.1' });

  testSuccessWhere('textInput component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.5' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('textInput component with empty course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.5' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course', _globals: { _components: { _textInput: { } } } }
    ]
  });

  testSuccessWhere('textInput component with incorrect _globals path', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.5' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course', _globals: { _textInput: { } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.6' }]
  });
});

describe('adapt-contrib-textInput - to v7.2.7', async () => {
  let components;
  const feedbackAltTitlePath = '_feedback.altTitle';

  whereFromPlugin('adapt-contrib-textInput - from <v7.2.7', { name: 'adapt-contrib-textInput', version: '<7.2.7' });

  whereContent('adapt-contrib-textInput - where missing altTitle', async () => {
    components = getComponents('textinput').filter(component => !_.has(component, feedbackAltTitlePath));
    return components.length;
  });

  mutateContent('adapt-contrib-textInput - add altTitle', async () => {
    components.forEach(component => {
      _.set(component, feedbackAltTitlePath, '');
    });
    return true;
  });

  checkContent('adapt-contrib-textInput - check altTitle added', async () => {
    const isValid = components.every(component => _.has(component, feedbackAltTitlePath));
    if (!isValid) throw new Error(`${feedbackAltTitlePath} not added`);
    return true;
  });

  updatePlugin('adapt-contrib-textInput - update to v7.2.7', { name: 'adapt-contrib-textInput', version: '7.2.7', framework: '>=5.19.1' });

  testSuccessWhere('textInput multiple components with/without _feedback.altTitle', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.6' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _id: 'c-105', _component: 'textinput', _feedback: { altTitle: '' } },
      { _id: 'c-110', _component: 'textinput', _feedback: {} }
    ]
  });

  testStopWhere('no textInput components', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.6' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.7' }]
  });
});

describe('adapt-contrib-textInput - to v7.3.0', async () => {
  let course, components;
  const correctAnswerPrefixPath = '_globals._components._textInput.correctAnswerPrefix';
  const correctAnswersPrefixPath = '_globals._components._textInput.correctAnswersPrefix';

  whereFromPlugin('adapt-contrib-textInput - from <v7.3.0', { name: 'adapt-contrib-textInput', version: '<7.3.0' });

  whereContent('adapt-contrib-textInput - where has textInput plugin', async () => {
    course = getCourse();
    components = getComponents('textinput');
    return true;
  });

  mutateContent('adapt-contrib-textInput - add correctAnswerPrefix', async () => {
    if (!_.has(course, correctAnswerPrefixPath)) _.set(course, correctAnswerPrefixPath, 'The correct answer is');
    return true;
  });

  mutateContent('adapt-contrib-textInput - add correctAnswersPrefix', async () => {
    if (!_.has(course, correctAnswersPrefixPath)) _.set(course, correctAnswersPrefixPath, 'Accepted correct answers include');
    return true;
  });

  mutateContent('adapt-contrib-textInput - add _canShowCorrectness', async () => {
    components.forEach(component => {
      if (_.has(component, '_canShowCorrectness')) return;
      component._canShowCorrectness = false;
    });
    return true;
  });

  checkContent('adapt-contrib-textInput - check correctAnswerPrefix added', async () => {
    const isValid = _.has(course, correctAnswerPrefixPath);
    if (!isValid) throw new Error(`${correctAnswerPrefixPath} not added`);
    return true;
  });

  checkContent('adapt-contrib-textInput - check correctAnswersPrefix added', async () => {
    const isValid = _.has(course, correctAnswersPrefixPath);
    if (!isValid) throw new Error(`${correctAnswersPrefixPath} not added`);
    return true;
  });

  checkContent('adapt-contrib-textInput - check _canShowCorrectness added', async () => {
    const isValid = components.every(component => _.has(component, '_canShowCorrectness'));
    if (!isValid) throw new Error('_canShowCorrectness not added');
    return true;
  });

  updatePlugin('adapt-contrib-textInput - update to v7.3.0', { name: 'adapt-contrib-textInput', version: '7.3.0', framework: '>=5.19.1' });

  testSuccessWhere('textInput multiple components with/without _feedback.altTitle', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.7' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course' }
    ]
  });

  testStopWhere('no textInput components', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.2.7' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '7.3.0' }]
  });
});
