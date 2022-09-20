const checkExistence = require('./check-existence');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('blank files do not count', async () => {
	const {isPresent,message} = await checkExistence('emptyfile.js');
	console.log(message);
	expect(isPresent).toBe(false);
	expect(message).toBe('emptyfile.js exists with no content. Please finish file contents before proceeding.')
});

test('false if file does not exist', async () => {
	const {isPresent,message} = await checkExistence('abc');
	console.log(message);
	expect(isPresent).toBe(false);
	expect(message).toBe('Error finding abc. Please ensure file exists and is in the correct location.')
});

test('look for file', async () => {
  const {isPresent,message} = await checkExistence('.github/dependabot.yml');
  console.log(message);
  expect(isPresent).toBe(true);
  expect(message).toBe('.github/dependabot.yml exists');
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['file_exists'] = true;
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
  console.log(result);
})
