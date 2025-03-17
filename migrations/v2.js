import {
  describe,
  whereFromPlugin,
  whereContent,
  mutateContent,
  checkContent,
  updatePlugin,
  getCourse,
  getComponents,
  testSuccessWhere,
  testStopWhere
} from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-textInput - to v2.0.2', async () => {
  let components;

  whereFromPlugin('adapt-contrib-textInput - from <v2.0.2', { name: 'adapt-contrib-textInput', version: '<2.0.2' });

  whereContent('adapt-contrib-textInput - where missing _recordInteraction', async () => {
    components = getComponents('textinput').filter(component => !_.has(component, '_recordInteraction'));
    return components.length;
  });

  mutateContent('adapt-contrib-textInput - add _recordInteraction', async () => {
    components.forEach(component => {
      component._recordInteraction = true;
    });
    return true;
  });

  checkContent('adapt-contrib-textInput - check _recordInteraction added', async () => {
    const isValid = components.every(component => _.has(component, '_recordInteraction'));
    if (!isValid) throw new Error('_recordInteraction not added');
    return true;
  });

  updatePlugin('adapt-contrib-textInput - update to v2.0.2', { name: 'adapt-contrib-textInput', version: '2.0.2', framework: '>=2.0.0' });

  testSuccessWhere('textInput multiple components with/without _recordInteraction', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.1' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _id: 'c-105', _component: 'textinput', _recordInteraction: true },
      { _id: 'c-110', _component: 'textinput' }
    ]
  });

  testStopWhere('no textInput components', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.1' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.2' }]
  });
});

describe('adapt-contrib-textInput - to v2.0.4', async () => {
  let components;

  whereFromPlugin('adapt-contrib-textInput - from <v2.0.4', { name: 'adapt-contrib-textInput', version: '<2.0.4' });

  whereContent('adapt-contrib-textInput - where missing _canShowModelAnswer', async () => {
    components = getComponents('textinput').filter(component => !_.has(component, '_canShowModelAnswer'));
    return components.length;
  });

  mutateContent('adapt-contrib-textInput - add _canShowModelAnswer', async () => {
    components.forEach(component => {
      component._canShowModelAnswer = true;
    });
    return true;
  });

  checkContent('adapt-contrib-textInput - check _canShowModelAnswer added', async () => {
    const isValid = components.every(component => _.has(component, '_canShowModelAnswer'));
    if (!isValid) throw new Error('_canShowModelAnswer not added');
    return true;
  });

  updatePlugin('adapt-contrib-textInput - update to v2.0.4', { name: 'adapt-contrib-textInput', version: '2.0.4', framework: '>=2.0.0' });

  testSuccessWhere('textInput multiple components with/without _canShowModelAnswer', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.3' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _id: 'c-105', _component: 'textinput', _canShowModelAnswer: true },
      { _id: 'c-110', _component: 'textinput' }
    ]
  });

  testStopWhere('no textInput components', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.3' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.4' }]
  });
});

describe('adapt-contrib-textInput - to v2.0.5', async () => {
  let components;

  whereFromPlugin('adapt-contrib-textInput - from <v2.0.5', { name: 'adapt-contrib-textInput', version: '<2.0.5' });

  whereContent('adapt-contrib-textInput - where has textInput components', async () => {
    components = getComponents('textinput');
    return components.length;
  });

  mutateContent('adapt-contrib-textInput - add _canShowFeedback', async () => {
    components.forEach(component => {
      if (_.has(component, '_canShowFeedback')) return;
      component._canShowFeedback = true;
    });
    return true;
  });

  mutateContent('adapt-contrib-textInput - add _canShowMarking', async () => {
    components.forEach(component => {
      if (_.has(component, '_canShowMarking')) return;
      component._canShowMarking = true;
    });
    return true;
  });

  checkContent('adapt-contrib-textInput - check _canShowFeedback added', async () => {
    const isValid = components.every(component => _.has(component, '_canShowFeedback'));
    if (!isValid) throw new Error('_canShowFeedback not added');
    return true;
  });

  checkContent('adapt-contrib-textInput - check _canShowMarking added', async () => {
    const isValid = components.every(component => _.has(component, '_canShowMarking'));
    if (!isValid) throw new Error('_canShowMarking not added');
    return true;
  });

  updatePlugin('adapt-contrib-textInput - update to v2.0.5', { name: 'adapt-contrib-textInput', version: '2.0.5', framework: '>=2.0.11' });

  testSuccessWhere('textInput multiple components with/without _canShowFeedback/_canShowMarking', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.4' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _id: 'c-105', _component: 'textinput', _canShowFeedback: true },
      { _id: 'c-110', _component: 'textinput', _canShowMarking: true },
      { _id: 'c-115', _component: 'textinput', _canShowFeedback: true, _canShowMarking: true }
    ]
  });

  testStopWhere('no textInput components', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.4' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.5' }]
  });
});

describe('adapt-contrib-textInput - to v2.1.0', async () => {
  let course;
  const ariaRegionPath = '_globals._components._textInput.ariaRegion';
  const newAriaRegion = 'This question requires you to input your answer in the textbox provided. When you have done so, select the submit button below.';
  const oldAriaRegion = 'This question component requires you to input your answer in the textbox provided. When you have answered the question select the submit button below.';

  whereFromPlugin('adapt-contrib-textInput - from <v2.1.0', { name: 'adapt-contrib-textInput', version: '<2.1.0' });

  whereContent('adapt-contrib-textInput - where using old _globals ariaRegion default', async () => {
    course = getCourse();
    return !_.has(course, ariaRegionPath) || _.get(course, ariaRegionPath) === oldAriaRegion;
  });

  mutateContent('adapt-contrib-textInput - update _globals ariaRegion default', async () => {
    _.set(course, ariaRegionPath, newAriaRegion);
    return true;
  });

  checkContent('adapt-contrib-textInput - check _globals ariaRegion default updated', async () => {
    const isValid = _.get(course, ariaRegionPath) === newAriaRegion;
    if (!isValid) throw new Error(`${ariaRegionPath} default not updated`);
    return true;
  });

  updatePlugin('adapt-contrib-textInput - update to v2.1.0', { name: 'adapt-contrib-textInput', version: '2.1.0', framework: '>=2.0.11' });

  testSuccessWhere('textInput component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.5' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('textInput multiple components with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.5' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course', _globals: { _components: { _textInput: { ariaRegion: oldAriaRegion } } } }
    ]
  });

  testSuccessWhere('textInput multiple components with incorrect course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.5' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course', _globals: { _textInput: { ariaRegion: oldAriaRegion } } }
    ]
  });

  testStopWhere('textInput multiple components with custom course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.0.5' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course', _globals: { _components: { _textInput: { ariaRegion: 'Custom ariaRegion' } } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.1.0' }]
  });
});

describe('adapt-contrib-textInput - to v2.2.0', async () => {
  let components;
  const feedbackTitlePath = '_feedback.title';

  whereFromPlugin('adapt-contrib-textInput - from <v2.2.0', { name: 'adapt-contrib-textInput', version: '<2.2.0' });

  whereContent('adapt-contrib-textInput - where missing _feedback.title', async () => {
    components = getComponents('textinput').filter(component => !_.has(component, feedbackTitlePath));
    return components.length;
  });

  mutateContent('adapt-contrib-textInput - add _feedback.title', async () => {
    components.forEach(component => {
      _.set(component, feedbackTitlePath, '');
    });
    return true;
  });

  checkContent('adapt-contrib-textInput - check _feedback.title added', async () => {
    const isValid = components.every(component => _.has(component, feedbackTitlePath));
    if (!isValid) throw new Error(`${feedbackTitlePath} not added`);
    return true;
  });

  updatePlugin('adapt-contrib-textInput - update to v2.2.0', { name: 'adapt-contrib-textInput', version: '2.2.0', framework: '>=2.0.11' });

  testSuccessWhere('textInput multiple components with/without _feedback.title', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.1.0' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _id: 'c-105', _component: 'textinput', _feedback: { title: 'title' } },
      { _id: 'c-110', _component: 'textinput', _feedback: {} },
      { _id: 'c-115', _component: 'textinput' }
    ]
  });

  testStopWhere('no textInput components', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.1.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.2.0' }]
  });
});
