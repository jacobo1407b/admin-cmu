const { writeFileSync } = require('fs');
const { config } = require('dotenv');
const chalk = require('chalk')


config();

const varsToExport = [
    'API_URL'
];

function getSerializedVal(varName) {
    const val = process.env[varName]
    return typeof val === 'string' ? `'${val}'` : val
};

const vals = varsToExport
    .map(varName => `${varName}: ${getSerializedVal(varName)}`)
    .join(',\n  ');

const jsFile = `${__dirname}/src/utils/env.ts`;

writeFileSync(jsFile, `export const env = {
    ${vals}
    }`, 'utf8');
console.log(chalk.blue('Export .env to: ') + chalk.green(jsFile))
