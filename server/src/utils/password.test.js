import assert from 'node:assert/strict';
import { hashPassword } from './password.js';

const plain = 'secret123';
const hashed = await hashPassword(plain);

assert.notEqual(hashed, plain);
assert.ok(hashed.startsWith('$2'));

const alreadyHashed = await hashPassword(hashed);
assert.equal(alreadyHashed, hashed);

console.log('password hashing test passed');
