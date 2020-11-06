import { Command } from 'commander';
import CreatePage from '../controllers/CreatePage';

const program = new Command();
program
  .version('1.0.0')
  .usage('-p -e MyAwesomePage -t ../../my-project/src/pages')
  .option('-p, --page', 'Create page module')
  .option('-e, --entity-name <value>', 'Define name for entity')
  .option('-t, --target-path <value>', 'Path, where created files will be placed');

program.parse(process.argv);

if (!program.page) {
  console.log(program.helpInformation());
} else {
  CreatePage(program.entityName, program.targetPath);
}
