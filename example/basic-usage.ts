import { BinaryExpression, Policy, Spectra, DataLoaderFunction } from '../src';

const loadDataFromDatabase: DataLoaderFunction = () => {
  return {
    'user.id': 1,
    'user.name': 'Amiya',
    'file.name': 'file.txt',
  };
};

const ALL_POLICIES = [
  new Policy({
    permissions: ['EDIT_FILE'],
    effect: 'ALLOW',
    filter: new BinaryExpression('user.id', '=', 1),
  }),
  new Policy({
    permissions: ['EDIT_FILE'],
    effect: 'DENY',
    filter: new BinaryExpression('user.id', '=', 2),
  }),
];

const result = Spectra.validate(ALL_POLICIES, loadDataFromDatabase, 'EDIT_FILE');

console.info(result); // true
