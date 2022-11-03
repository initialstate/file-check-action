const fs = require('fs');
const checkCodeowners = require('./check-contents');

async function checkPath(path) {
	try {
		let lowerCasePath = path.toLowerCase();
		if (fs.existsSync(path) || fs.existsSync(lowerCasePath)) {return path}
		else if (fs.existsSync(`${path}.md`) || fs.existsSync(`${lowerCasePath}.md`)) {return `${path}.md`}
		else if (fs.existsSync(`${path}.txt`) || fs.existsSync(`${lowerCasePath}.txt`)) {return `${path}.txt`}
		else if (fs.existsSync(`${path}.rst`) || fs.existsSync(`${lowerCasePath}.rst`)) {return `${path}.rst`}
		else if (fs.existsSync(`${path}-MIT`) || fs.existsSync(`${lowerCasePath}-MIT`)) {return `${path}-MIT`}
		else if (fs.existsSync(`${path}-APACHE`) || fs.existsSync(`${lowerCasePath}-APACHE`)) {return `${path}-APACHE`}
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