const env = process.env.NODE_ENV || 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
	development :{
		APIKey : '',
		APISecret : ''
	},
	production:{	
		APIKey : '9ccJuAHyStWc_21278HiDg',
		APISecret : 'WwW9DC8Cuw9YYmfevblgQ2jWGrAOOoVS2qvA'
	}
};

module.exports = config[env]
