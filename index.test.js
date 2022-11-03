const checkExistence = require('./check-existence');

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

test('look for codeowner global owner', async () => {
	const {isPresent,message} = await checkExistence('.github/CODEOWNERS');
	console.log(message);
	expect(isPresent).toBe(true);
	expect(message).toBe('.github/CODEOWNERS exists');
  });

test('fail if no codeowner global owner', async () => {
	const {isPresent,message} = await checkExistence('.github/CODEOWNERS-bad');
	console.log(message);
	expect(isPresent).toBe(false);
	expect(message).toBe('There is no global owner in .github/CODEOWNERS-bad. Please add one before proceeding.');
  });

test('find file without extension', async () => {
	const {isPresent,message} = await checkExistence('README');
	console.log(message);
	expect(isPresent).toBe(true);
	expect(message).toBe('README exists');
});

test('error on no file without extension', async () => {
	const {isPresent,message} = await checkExistence('abc');
	console.log(message);
	expect(isPresent).toBe(false);
	expect(message).toBe('Error finding abc. Please ensure file exists and is in the correct location.');
});

test('should work on lowercase', async () => {
	const {isPresent,message} = await checkExistence('license.txt');
	console.log(message);
	expect(isPresent).toBe(true);
	expect(message).toBe('license.txt exists');
});
