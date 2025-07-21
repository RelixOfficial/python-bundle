# python-bundle

<div align="center">
  <a href="https://github.com/RelixOfficial/python-bundle">
    <img src="./icon.png" alt="python-bundle logo" height="135px">
  </a>
  <h2>python-bundle</h2>
  <p>Embed Portable Python 3 + pip into Node.js projects</p>
  <p>
    <a href="https://npmjs.com/package/python-bundle"><img src="https://img.shields.io/npm/v/python-bundle.svg" alt="npm version"></a>
    <a href="https://npmjs.com/package/python-bundle"><img src="https://img.shields.io/npm/dm/python-bundle.svg" alt="npm downloads"></a>
    <a href="https://github.com/RelixOfficial/python-bundle/blob/main/LICENSE"><img src="https://img.shields.io/github/license/RelixOfficial/python-bundle.svg" alt="license"></a>
  </p>
</div>

---

## ✨ Features

- **Portable Python 3.12** via Miniforge (auto-download on install)
- **Built-in pip** for Python package management
- **Supports CommonJS & ESM** (`require` & `import`)
- **No system Python** dependency (ideal for Pterodactyl, Docker, serverless)
- **Stream & Interactive modes** for real-time output & user input
- **Four main methods**: `execPython`, `runScript`, `runCode`, `pipInstall`

---

## 🚀 Installation

```bash
npm install python-bundle
```

> **Note**: Runs `postinstall` hook to download Miniforge into `vendor/python`.

---

## 🛠️ API Reference

Import the module:

#### CommonJS

```js
const pb = require('python-bundle');
```

#### ESM

```js
import * as pb from 'python-bundle';
```

### `execPython(args, options)`

Execute any Python command.

- `args` (`string[]`): CLI arguments for Python (e.g. `['-c', 'print("Hi")']`).
- `options` (`object`):
  - `cwd` (`string`): Working directory.
  - `stream` (`boolean`): If `true`, pipes stdout/stderr live to console.
  - `interactive` (`boolean`): If `true`, connects stdin for `input()` support.

```js
// Example: inline code, real-time output
await pb.execPython(['-c', 'print("Hello!")'], { stream: true });
```

### `runScript(scriptPath, args, options)`

Run a Python `.py` file.

- `scriptPath` (`string`): Path to your Python script.
- `args` (`string[]`): Arguments passed to script (default `[]`).
- `options`: Same as `execPython`.

```js
// Example: run test.py with args
await pb.runScript('scripts/test.py', ['arg1', 'arg2'], { stream: true });
```

### `runCode(codeString, options)`

Execute inline Python code block.

- `codeString` (`string`): Python source.
- `options`: Same as `execPython`.

```js
await pb.runCode('import sys; print(sys.platform)', { stream: true });
```

### `pipInstall(packages, options)`

Install Python packages via pip.

- `packages` (`string[]`): List of package names.
- `options`:
  - `stream` (`boolean`): Show pip output live.

```js
// Install requests & pandas with live logs
await pb.pipInstall(['requests', 'pandas'], { stream: true });
```

---

## 📁 Example Project Structure

```
my-app/
├── scripts/
│   └── test.py
├── index.js
└── package.json
```

---

## 🔧 Examples

#### 1. CommonJS Full Example

```js
const { pipInstall, runScript, runCode, execPython } = require('python-bundle');

(async () => {
  // 1) Install packages with live logs
  await pipInstall(['requests'], { stream: true });

  // 2) Run inline code
  await execPython(['-c', 'print("Inline execution")'], { stream: true });

  // 3) Run a script
  const output = await runScript('scripts/test.py', ['hello'], { stream: false });
  console.log('Script output:', output);

  // 4) Run a script interactively
  await runScript('scripts/interactive.py', [], { interactive: true });
})();
```

#### 2. ESM Full Example

```js
import { pipInstall, runScript, runCode, execPython } from 'python-bundle';

await pipInstall(['numpy'], { stream: true });
await runCode('print("ESM inline")', { stream: true });
const out = await runScript('scripts/test.py');
console.log(out);
```

---

## ⚠️ Troubleshooting

- **EOFError from `input()`**  
  Enable `interactive: true` or avoid `input()` in non-TTY environments.

- **Missing Python binary**  
  Ensure `npm install` succeeded and `vendor/python/bin/python` exists.  
  Delete `vendor/python` and reinstall if needed.

- **Permission Denied**  
  On Docker, run `chmod +x vendor/python/bin/python`.

---

## 📄 License

MIT © 2025 RelixOfficial

---

> **Maintained with ❤️ by RelixTeam.** PRs and contributions are welcome.
