const fs = require('fs');
const checkCodeowners = require('./check-contents');

async function checkPath(path) {
	try {
		if (fs.existsSync(path)) {return path}
		else if (fs.existsSync(`${path}.md`)) {return `${path}.md`}
		else if (fs.existsSync(`${path}.txt`)) {return `${path}.txt`}
		else if (fs.existsSync(`${path}.rst`)) {return `${path}.rst`}
		else {throw Error}
	} catch (error) {
		return error;
	}
}

async function checkExistence(path) {
	try {
		const truePath = await checkPath(path);
		const data = fs.readFileSync(truePath,'utf8')
		if (data && data.length > 0) {
			if (truePath.includes('CODEOWNERS')) {
				const contentCheck = await checkCodeowners(data);
				if (!contentCheck) {
					return {isPresent:false,message:`There is no global owner in ${path}. Please add one before proceeding.`};
				} else {
					return {isPresent:true,message:`${path} exists`};
				}
			}
			return {isPresent:true,message:`${path} exists`};
		} else {
			return {isPresent:false,message:`${path} exists with no content. Please finish file contents before proceeding.`};
		}
	} catch (error) {
		return {isPresent:false,message:`Error finding ${path}. Please ensure file exists and is in the correct location.`};
	}
  }

module.exports = checkExistence;