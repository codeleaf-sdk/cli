"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    'index.ts': "import { CreatePageModule{$STORE-IMPORT-DEPS} } from '@codeleaf-sdk/core';\nimport {$MODULE}Store from './store';\nimport {$MODULE}Service from './service';\nimport {$MODULE}Page from './page';\n\nexport const {$MODULE}Module = CreatePageModule<{$MODULE}Store, {$MODULE}Service>({\n  path: '/',\n  component: {$MODULE}Page,\n  store: [{$MODULE}Store, {$STORE-DEPS-DEPS}],\n  service: [{$MODULE}Service, {$SERVICE-DEPS-DEPS}],\n});  \n",
    'page.tsx': "import React, { FC, useContext } from 'react';\nimport { observer } from 'mobx-react';\nimport { {$MODULE}Module } from './index';\n\nconst {$MODULE}Page: FC = () => {\n  const { store, service } = useContext({$MODULE}Module.Context);\n\n  console.log({ store, service });\n\n  return <span>Functional Component</span>;\n}\n\nexport default observer({$MODULE}Page);\n",
    'service.ts': "export default class {$MODULE}Service {\n  constructor({$SERVICE-CONSTRUCTOR-DEPS}) {}\n\n  async getData(): Promise<null> {\n    // ...\n  }\n}",
    'store.ts': "import { BaseStore{$STORE-IMPORT-DEPS} } from '@codeleaf-sdk/core';\nimport { Model } from '@models/Model';\nimport { computed } from 'mobx';\n\ntype {$MODULE}StoreState = {\n  models: Model[];\n};\n\nexport default class {$MODULE}Store extends BaseStore<{$MODULE}StoreState> {\n  constructor({$STORE-CONSTRUCTOR-DEPS}) {\n    super({ models: [] }, '{$MODULE}Store');\n  }\n\n  @computed\n  get models(): Model[] {\n    return this.state.models;\n  }\n}\n"
};
