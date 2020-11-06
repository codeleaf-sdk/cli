import prompts from 'prompts';
import { mkdir, readFile, writeFile } from 'async-fs-wrapper';
import replaceString from 'replace-string';
import templates from '../templates';

type InterpolationMap = {
  "{$MODULE}": string;
  "{$STORE-CONSTRUCTOR-DEPS}": string;
  "{$STORE-IMPORT-DEPS}": string;
  "{$STORE-DEPS-DEPS}": string;
  "{$SERVICE-CONSTRUCTOR-DEPS}": string;
  "{$SERVICE-IMPORT-DEPS}": string;
  "{$SERVICE-DEPS-DEPS}": string;
};

const CreatePage = async (_moduleName: string | undefined, _modulePath: string | undefined) => {
  const { moduleName } = _moduleName ? { moduleName: _moduleName } : await prompts({
    type: 'text',
    name: 'moduleName',
    message: 'Enter module name',
    validate: value => value.length === 0 || value[0].toUpperCase() !== value[0] ? 'Module name must start from upper case' : true
  });

  const { modulePath } = _modulePath ? { modulePath : _modulePath } : await prompts({
    type: 'text',
    name: 'modulePath',
    message: 'Enter module path',
  });

  console.log({ moduleName, modulePath });

  console.info(`
INFO: store creating now support inject only in-built stores
INFO: service creating now doesn't support any injects
  `);

  let { injectFetchStore } = await prompts({
    type: 'text',
    name: 'injectFetchStore',
    message: 'Inject Fetch Store? (y/n)',
    validate: value => ['y', 'n'].includes(value.injectFetchStore) ? 'type "y" or "n"!' : true
  });

  let { injectPaginationStore } = await prompts({
    type: 'text',
    name: 'injectPaginationStore',
    message: 'Inject Pagination Store? (y/n)',
    validate: value => ['y', 'n'].includes(value.injectPaginationStore) ? 'type "y" or "n"!' : true
  });

  const interpolationMap: InterpolationMap = {
    "{$MODULE}": moduleName,
    "{$STORE-CONSTRUCTOR-DEPS}": '',
    "{$STORE-IMPORT-DEPS}": '',
    "{$STORE-DEPS-DEPS}": 'null',
    // not supported now
    "{$SERVICE-CONSTRUCTOR-DEPS}": '',
    "{$SERVICE-IMPORT-DEPS}": '',
    "{$SERVICE-DEPS-DEPS}": 'null',
  };

  if (injectFetchStore === 'y' || injectPaginationStore === 'y') {
    const fetch = injectFetchStore === 'y' ? `{ ClassName: FetchStore, Args: ['${moduleName}FetchStore'] },` : '';
    const pagination = injectPaginationStore === 'y' ? `{ ClassName: PaginationStore, Args: ['${moduleName}PaginationStore'] },` : '';

    interpolationMap['{$STORE-DEPS-DEPS}'] = `[${fetch} ${pagination}],`;
  }

  if (injectFetchStore === 'y') {
    interpolationMap['{$STORE-CONSTRUCTOR-DEPS}'] = 'readonly fetch: FetchStore';
    interpolationMap['{$STORE-IMPORT-DEPS}'] = ', FetchStore';
  }

  if (injectPaginationStore === 'y') {
    interpolationMap['{$STORE-CONSTRUCTOR-DEPS}'] = `${interpolationMap['{$STORE-CONSTRUCTOR-DEPS}']}, readonly pagination: PaginationStore`;
    interpolationMap['{$STORE-IMPORT-DEPS}'] = `${interpolationMap['{$STORE-IMPORT-DEPS}']}, PaginationStore`;
  }

  console.log('INFO: Writing files');
  try {
    await readTemplates(interpolationMap, `${modulePath}/${moduleName}`, ['index._ts', 'page._tsx', 'service._ts', 'store._ts']);
    console.log('INFO: Done');
  } catch (Err) {
    console.error(Err.message);
  }
}

const readTemplates = async (interpolationMap: InterpolationMap, modulePath: string, files: string[]) => {
  await mkdir(`${modulePath}`);

  Promise.all(Object.entries(templates).map(async ([fileName, contents]) => {
    let plain = `${contents}`;
    Object.entries(interpolationMap).forEach(([key, value]) => {
      plain = replaceString(plain, key, value);
    });

    await writeFile(`${modulePath}/${fileName.replace('_', '')}`, plain);
  }));
};

export default CreatePage;
