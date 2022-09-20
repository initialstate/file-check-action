const fs = require('fs');

async function checkExistence(path) {
	try {
		const data = fs.readFileSync(path,'utf8')
		if (data) {
			if (data.length == 0) {
				return {isPresent:false,message:'File exists with no content. Please finish file contents before proceeding.'};
			} else {
				return {isPresent:true,message:'File exists'};
			}
		} else {
			return {isPresent:false,message:'File does not exist. Please create file before proceeding.'};
		}
	} catch (error) {
		return {isPresent:false,message:'Error finding file'};
	}
  }

module.exports = checkExistence;