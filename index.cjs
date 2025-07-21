// index.js
const { spawn } = require('child_process');
const { join } = require('path');

const PY_HOME = join(__dirname, 'vendor', 'python');
const PY_BIN  = join(PY_HOME, 'bin', 'python');

/**
 * execPython: menjalankan python interpreter
 * @param {string[]} args           array argumen
 * @param {object} opts             { cwd, stream, interactive }
 * @returns {Promise<void>}
 */
function execPython(args = [], opts = {}) {
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
 * runScript: jalankan file .py
 * @param {string} script           path ke script
 * @param {string[]} args           array argumen
 * @param {object} opts             { cwd, stream, interactive }
 */
function runScript(script, args = [], opts = {}) {
  if (typeof script !== 'string') {
    return Promise.reject(new TypeError('script must be a string'));
  }
  const argv = Array.isArray(args) ? args : [];
  return execPython([script, ...argv], opts);
}

/**
 * runCode: jalankan inline Python
 * @param {string} code             baris kode Python
 * @param {object} opts             { cwd, stream, interactive }
 */
function runCode(code, opts = {}) {
  if (typeof code !== 'string') {
    return Promise.reject(new TypeError('code must be a string'));
  }
  return execPython(['-c', code], opts);
}

/**
 * pipInstall: install package Python via pip
 * @param {string[]} packages       array nama package
 * @param {object} opts             { cwd, stream }
 */
function pipInstall(packages = [], opts = {}) {
  const list = Array.isArray(packages) ? packages : [];
  return execPython(['-m','pip','install', ...list], opts);
}

module.exports = { execPython, runScript, runCode, pipInstall };