import {
  BinaryExpression,
  Policy,
  Spectra,
  parseDependences,
  ResourceInterface,
  DataInterface,
} from '../src';

const ALL_POLICIES = [
  new Policy({
    applyFilter: new BinaryExpression('user.id', '=', 1),
    permissions: ['EDIT_FILE'],
    effect: 'ALLOW',
  }),
  new Policy({
    applyFilter: new BinaryExpression('user.id', '=', 2),
    permissions: ['EDIT_FILE'],
    effect: 'DENY',
  }),
];

const resourcesToLoad = ALL_POLICIES.reduce((memo, p) => {
  const dataDependencies = parseDependences(p.getApplyFilter());
  return Object.assign(memo, dataDependencies);
}, {} as ResourceInterface);

function loadDataFromDatabase(resources: ResourceInterface): DataInterface {
  return {
    'user.id': 1,
    'user.name': 'Amiya',
    'file.name': 'file.txt',
  };
}

const resources = loadDataFromDatabase(resourcesToLoad);

const result = Spectra.validate(ALL_POLICIES, resources);

console.info(result); // true
