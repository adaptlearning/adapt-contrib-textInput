import {
  describe,
  whereFromPlugin,
  whereContent,
  mutateContent,
  checkContent,
  updatePlugin,
  getCourse,
  testSuccessWhere,
  testStopWhere
} from 'adapt-migrations';
import _ from 'lodash';

/**
 * schema previously updated in v2.1.0 but task shouldn't use >=2.1.0 <3.0.0 range
 */
describe('adapt-contrib-textInput - to v3.0.0', async () => {
  let course;
  const ariaRegionPath = '_globals._components._textInput.ariaRegion';
  const newAriaRegion = 'Text input. Type your answer and then submit.';
  const oldAriaRegion = 'This question requires you to input your answer in the textbox provided. When you have done so, select the submit button below.';

  whereFromPlugin('adapt-contrib-textInput - from <v3.0.0', { name: 'adapt-contrib-textInput', version: '<3.0.0' });

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

  updatePlugin('adapt-contrib-textInput - update to v3.0.0', { name: 'adapt-contrib-textInput', version: '3.0.0', framework: '>=2.0.16' });

  testSuccessWhere('textInput component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.2.0' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('textInput multiple components with default course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.2.0' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course', _globals: { _components: { _textInput: { ariaRegion: oldAriaRegion } } } }
    ]
  });

  testSuccessWhere('textInput multiple components with empty course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '2.2.0' }],
    content: [
      { _id: 'c-100', _component: 'textinput' },
      { _type: 'course', _globals: { _components: { _textInput: { } } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-textInput', version: '3.0.0' }]
  });
});
