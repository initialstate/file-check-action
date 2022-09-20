const fs = require('fs');

async function checkExistence(path) {
	try {
		const data = fs.readFileSync(path,'utf8')
		if (data && data.length > 0) {
			return {isPresent:true,message:`${path} exists`};
		} else {
			return {isPresent:false,message:`${path} exists with no content. Please finish file contents before proceeding.`};
		}
	} catch (error) {
		return {isPresent:false,message:`Error finding ${path}. Please ensure file exists and is in the correct location.`};
	}
  }

module.exports = checkExistence;