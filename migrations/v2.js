import {
  describe,
  whereFromPlugin,
  whereContent,
  mutateContent,
  checkContent,
  updatePlugin,
  getCourse,
  getComponents
} from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-textInput - to v2.0.2', async () => {
  let components;
  whereFromPlugin('adapt-contrib-textInput - from <v2.0.2', { name: 'adapt-contrib-textInput', version: '<2.0.2' });
  whereContent('adapt-contrib-textInput - where missing _recordInteraction', async () => {
    components = getComponents('textinput').filter(component => !_.has(component, '_recordInteraction'));
    return Boolean(components.length);
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
});

describe('adapt-contrib-textInput - to v2.0.4', async () => {
  let components;
  whereFromPlugin('adapt-contrib-textInput - from <v2.0.4', { name: 'adapt-contrib-textInput', version: '<2.0.4' });
  whereContent('adapt-contrib-textInput - where missing _canShowModelAnswer', async () => {
    components = getComponents('textinput').filter(component => !_.has(component, '_canShowModelAnswer'));
    return Boolean(components.length);
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
});

describe('adapt-contrib-textInput - to v2.0.5', async () => {
  let components;
  whereFromPlugin('adapt-contrib-textInput - from <v2.0.5', { name: 'adapt-contrib-textInput', version: '<2.0.5' });
  whereContent('adapt-contrib-textInput - where has textInput components', async () => {
    components = getComponents('textinput');
    return Boolean(components.length);
  });
  mutateContent('adapt-contrib-textInput - add _canShowFeedback', async () => {
    components.forEach(component => {
      if (_.has(component, '_canShowFeedback')) return;
      component._canShowFeedback = true;
    });
    return true;
  });
  checkContent('adapt-contrib-textInput - check _canShowFeedback added', async () => {
    const isValid = components.every(component => _.has(component, '_canShowFeedback'));
    if (!isValid) throw new Error('_canShowFeedback not added');
    return true;
  });
  mutateContent('adapt-contrib-textInput - add _canShowMarking', async () => {
    components.forEach(component => {
      if (_.has(component, '_canShowMarking')) return;
      component._canShowMarking = true;
    });
    return true;
  });
  checkContent('adapt-contrib-textInput - check _canShowMarking added', async () => {
    const isValid = components.every(component => _.has(component, '_canShowMarking'));
    if (!isValid) throw new Error('_canShowMarking not added');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v2.0.5', { name: 'adapt-contrib-textInput', version: '2.0.5', framework: '>=2.0.11' });
});

describe('adapt-contrib-textInput - to v2.1.0', async () => {
  let course;
  const ariaRegionPath = '_globals._components._textInput.ariaRegion';
  whereFromPlugin('adapt-contrib-textInput - from <v2.1.0', { name: 'adapt-contrib-textInput', version: '<2.1.0' });
  whereContent('adapt-contrib-textInput - where using old _globals ariaRegion default', async () => {
    course = getCourse();
    const oldAriaRegion = 'This question component requires you to input your answer in the textbox provided. When you have answered the question select the submit button below.';
    return !_.has(course, ariaRegionPath) || _.get(course, ariaRegionPath) === oldAriaRegion;
  });
  const newAriaRegion = 'This question requires you to input your answer in the textbox provided. When you have done so, select the submit button below.';
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
});

describe('adapt-contrib-textInput - to v2.2.0', async () => {
  let components;
  const feedbackTitlePath = '_feedback.title';
  whereFromPlugin('adapt-contrib-textInput - from <v2.2.0', { name: 'adapt-contrib-textInput', version: '<2.2.0' });
  whereContent('adapt-contrib-textInput - where missing _feedback.title', async () => {
    components = getComponents('textinput').filter(component => !_.has(component, feedbackTitlePath));
    return Boolean(components.length);
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
});