const checkExistence = require('./check-existence');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('blank files do not count', async () => {
	const isPresent = await checkExistence('emptyfile.js');
	console.log(isPresent);
	expect(isPresent).toBe(false);
});

test('false if file does not exist', async () => {
	const isPresent = await checkExistence('abc');
	console.log(isPresent);
	expect(isPresent).toBe(false);
});

test('look for file', async () => {
  const isPresent = await checkExistence('.github/dependabot.yml');
  console.log(isPresent);
  expect(isPresent).toBe(true);
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['file_exists'] = true;
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
  console.log(result);
})
