module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleDirectories: ['node_modules', 'src'],
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
	testMatch: ['<rootDir>/test/*.(test|spec).ts'],
	testTimeout: 15000,
};
