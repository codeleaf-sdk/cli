"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var CreatePage_1 = __importDefault(require("../controllers/CreatePage"));
var program = new commander_1.Command();
program
    .version('1.0.0')
    .usage('-p -e MyAwesomePage -t ../../my-project/src/pages')
    .option('-p, --page', 'Create page module')
    .option('-e, --entity-name <value>', 'Define name for entity')
    .option('-t, --target-path <value>', 'Path, where created files will be placed');
program.parse(process.argv);
if (!program.page) {
    console.log(program.helpInformation());
}
else {
    CreatePage_1.default(program.entityName, program.targetPath);
}
