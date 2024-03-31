# Spectra JS

- [Spectra JS](#spectra-js)
  - [Motivation](#motivation)
  - [See also](#see-also)
  - [Installing](#installing)
  - [Usage](#usage)
  - [License](#license)

## Motivation

Inspired by [《How we built a custom permissions DSL at Figma》](https://www.figma.com/blog/how-we-rolled-out-our-own-permissions-dsl-at-figma).

## See also

- [overtrue/spectra](https://github.com/overtrue/spectra) for PHP
- [ramzeng/spectra](https://github.com/ramzeng/spectra) for Go

## Installing

```bash
pnpm install spectra.js
```

## Usage

```ts
import {
  Policy,
  Spectra,
  parseDependences,
  ResourceInterface,
  DataInterface,
 } from 'spectra.js';

function loadDataFromDatabase(resources: ResourceInterface): DataInterface {
  return {
    'user.id': 2,
  };
}

const policy = new Policy({
  applyFilter: ['user.id', '=', 2],
  permissions: ['EDIT_FILE'],
  effect: 'DENY',
});

const dataDependencies = parseDependences(policy.getApplyFilter());
const resources = loadDataFromDatabase(dataDependencies);
const result = Spectra.validate([policy], resources);

console.info(result); // false
```

See [exapmle](./example/) for more usage.

## License

[MIT](./LICENSE)
