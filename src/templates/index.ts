export default {

  'index.ts': `import { CreatePageModule{$STORE-IMPORT-DEPS} } from '@codeleaf-sdk/core';
import {$MODULE}Store from './store';
import {$MODULE}Service from './service';
import {$MODULE}Page from './page';

export const {$MODULE}Module = CreatePageModule<{$MODULE}Store, {$MODULE}Service>({
  path: '/',
  component: {$MODULE}Page,
  store: [{$MODULE}Store, {$STORE-DEPS-DEPS}],
  service: [{$MODULE}Service, {$SERVICE-DEPS-DEPS}],
});  
`,


  'page.tsx': `import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { {$MODULE}Module } from './index';

const {$MODULE}Page: FC = () => {
  const { store, service } = useContext({$MODULE}Module.Context);

  console.log({ store, service });

  return <span>Functional Component</span>;
}

export default observer({$MODULE}Page);
`,


  'service.ts': `export default class {$MODULE}Service {
  constructor({$SERVICE-CONSTRUCTOR-DEPS}) {}

  async getData(): Promise<null> {
    // ...
  }
}`,


  'store.ts': `import { BaseStore{$STORE-IMPORT-DEPS} } from '@codeleaf-sdk/core';
import { Model } from '@models/Model';
import { computed } from 'mobx';

type {$MODULE}StoreState = {
  models: Model[];
};

export default class {$MODULE}Store extends BaseStore<{$MODULE}StoreState> {
  constructor({$STORE-CONSTRUCTOR-DEPS}) {
    super({ models: [] }, '{$MODULE}Store');
  }

  @computed
  get models(): Model[] {
    return this.state.models;
  }
}
`
}
