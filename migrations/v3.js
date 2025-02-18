import {
  describe,
  whereFromPlugin,
  whereContent,
  mutateContent,
  checkContent,
  updatePlugin,
  getCourse
} from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-textInput - v2.1.0 to v3.0.0', async () => {
  let course;
  const ariaRegionPath = '_globals._components._textInput.ariaRegion';
  whereFromPlugin('adapt-contrib-textInput - from v2.1.0 to v3.0.0', { name: 'adapt-contrib-textInput', version: '<3.0.0' });
  whereContent('adapt-contrib-textInput - where using old _globals ariaRegion default', async () => {
    course = getCourse();
    const oldAriaRegions = [
      'This question component requires you to input your answer in the textbox provided. When you have answered the question select the submit button below.',
      'This question requires you to input your answer in the textbox provided. When you have done so, select the submit button below.'
    ];
    return !_.has(course, ariaRegionPath) || oldAriaRegions.includes(_.get(course, ariaRegionPath));
  });
  const newAriaRegion = 'Text input. Type your answer and then submit.';
  mutateContent('adapt-contrib-textInput - update _globals ariaRegion default', async () => {
    _.set(course, ariaRegionPath, newAriaRegion);
    return true;
  });
  checkContent('adapt-contrib-textInput - check _globals ariaRegion default updated', async () => {
    const isValid = _.get(course, ariaRegionPath) === newAriaRegion;
    if (!isValid) throw new Error(`${ariaRegionPath} default not updated`);
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v3.0.0', { name: 'adapt-contrib-text', version: '3.0.0', framework: '>=2.0.16' });
});