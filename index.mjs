// index.mjs
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PY_HOME = join(__dirname, 'vendor', 'python');
const PY_BIN  = join(PY_HOME, 'bin', 'python');

/**
 * execPython: run embedded Python
 * @param {string[]} args
 * @param {object} opts     { cwd, stream, interactive }
 */
export function execPython(args = [], opts = {}) {
  if (!Array.isArray(args)) args = [];
  const interactive = opts.interactive === true;
  const stdio = interactive
    ? ['inherit','inherit','inherit']
    : (opts.stream
        ? 'inherit'
        : ['ignore','pipe','pipe']);

  return new Promise((resolve, reject) => {
    const proc = spawn(
      PY_BIN,
      ['-O', ...args],
      {
        cwd: opts.cwd || process.cwd(),
        env: { ...process.env, PYTHONHOME: PY_HOME },
        stdio
      }
    );

    if (!interactive && !opts.stream) {
      proc.stdout.on('data', d => process.stdout.write(d));
      proc.stderr.on('data', d => process.stderr.write(d));
    }

    proc.on('close', code => {
      code === 0
        ? resolve()
        : reject(new Error(`Python exited with code ${code}`));
    });
    proc.on('error', reject);
  });
}

/**
 * runScript: execute a .py file
 */
export function runScript(script, args = [], opts = {}) {
  if (typeof script !== 'string') {
    return Promise.reject(new TypeError('script must be a string'));
  }
  const argv = Array.isArray(args) ? args : [];
  return execPython([script, ...argv], opts);
}

/**
 * runCode: execute inline Python code
 */
export function runCode(code, opts = {}) {
  if (typeof code !== 'string') {
    return Promise.reject(new TypeError('code must be a string'));
  }
  return execPython(['-c', code], opts);
}

/**
 * pipInstall: install Python packages
 */
export function pipInstall(packages = [], opts = {}) {
  const list = Array.isArray(packages) ? packages : [];
  return execPython(['-m','pip','install', ...list], opts);
}