const core = require('@actions/core');
const checkExistence = require('./check-existence');

async function run() {
	try {
		const file = core.getInput('file');
		const isPresent = await checkExistence(file);
		if (isPresent) {
			core.setOutput('file_exists','true');
		} else {
			core.setOutput('file_exists','false');
			core.warning('An important file is empty or missing.')
		}
	} catch (error) {
		core.setFailed(error.message);
	}
  }

run();
