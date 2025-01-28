import { describe , whereContent, whereFromPlugin, whereToPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

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

describe('adapt-contrib-textInput - v2.1.0 to v3.0.0', async () => {
  whereFromPlugin('adapt-contrib-textInput - from v2.1.0 to v3.0.0', { name: 'adapt-contrib-textInput', version: '<3.0.0'});
  let course;
  whereContent('adapt-contrib-textInput - where using old _globals ariaRegion default', async content => {
    course = content.find(({ _type }) => _type === 'course');
    const oldAriaRegion = 'This question requires you to input your answer in the textbox provided. When you have done so, select the submit button below.';
    return !hasKey(course?._globals?._components?._textInput, 'ariaRegion') || course?._globals?._components?._textInput?.ariaRegion === oldAriaRegion;
  });
  const newAriaRegion = 'Text input. Type your answer and then submit.';
  mutateContent('adapt-contrib-textInput - update _globals ariaRegion default', async () => {
    setObjectPathValue(course, '_globals._components._textInput.ariaRegion', newAriaRegion, true);
    return true;
  });
  checkContent('adapt-contrib-textInput - check _globals ariaRegion default updated', async () => {
    const isValid = course._globals._components._textInput.ariaRegion === newAriaRegion;
    if (!isValid) throw new Error('_globals ariaRegion default not updated');
    return true;
  });
  updatePlugin('adapt-contrib-textInput - update to v3.0.0', {name: 'adapt-contrib-text', version: '3.0.0', framework: '>=2.0.16'})
});