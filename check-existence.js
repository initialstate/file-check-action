const fs = require('fs');

async function checkExistence(path) {
	try {
		const data = fs.readFileSync(path,'utf8')
		if (data) {
			if (data.length == 0) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
  }

module.exports = checkExistence;