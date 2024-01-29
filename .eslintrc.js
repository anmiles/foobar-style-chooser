module.exports = {
	root    : true,
	extends : [
		'./node_modules/@anmiles/eslint-config/.eslintrc.js',
	],
	env : {
		node    : true,
		jest    : true,
		browser : true,
	},
	ignorePatterns : [
		'**/node_modules/',
		'coverage/',
		'dist/',
	],
};
