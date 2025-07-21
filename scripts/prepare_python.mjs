// scripts/prepare_python.js
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const PY_HOME = join(__dirname, '..', 'vendor', 'python');
const PY_BIN  = join(PY_HOME, 'bin', 'python');

if (!existsSync(PY_BIN)) {
  console.error('❌ Interpreter tidak ditemukan di', PY_BIN);
  console.error('   Pastikan `npm install` berhasil tanpa error.');
  process.exit(1);
}

console.log('✅ Found Python interpreter at', PY_BIN);