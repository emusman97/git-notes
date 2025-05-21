const path = require('path');
const fs = require('fs');
const json5 = require('json5');

const tsConfigPath = path.resolve(__dirname, '../', 'tsconfig.app.json');
const jsConfigPath = path.resolve(__dirname, '../', 'jsconfig.json');

const tsConfigJsonString = fs.readFileSync(tsConfigPath, 'utf-8');

const tsConfig = json5.parse(tsConfigJsonString);
const jsConfig = {
  compilerOptions: {
    baseUrl: tsConfig.compilerOptions.baseUrl,
    paths: tsConfig.compilerOptions.paths,
  },
};

fs.writeFileSync(jsConfigPath, JSON.stringify(jsConfig));
