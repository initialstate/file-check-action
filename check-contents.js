async function checkCodeowners(data) {
	try {
		console.log(data)
		if (data.includes('* ') && data.includes('@')) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
  }

module.exports = checkCodeowners;