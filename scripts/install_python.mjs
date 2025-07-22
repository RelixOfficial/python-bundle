import { execSync } from 'child_process';
import os from 'os';

const arch = os.arch(); // 'x64' or 'arm64'
const version = '3.12';
// 5 dan 6 not found
const urls = {
  '3.5': {
    x64: 'https://repo.anaconda.com/miniconda/Miniconda3-py35_4.3.31-Linux-x86_64.sh'
  },
  '3.6': {
    x64: 'https://repo.anaconda.com/miniconda/Miniconda3-py36_4.9.2-Linux-x86_64.sh'
  },
  '3.7': {
    x64: 'https://repo.anaconda.com/miniconda/Miniconda3-py37_4.12.0-Linux-x86_64.sh'
  },
  '3.8': {
    x64: 'https://repo.anaconda.com/miniconda/Miniconda3-py38_4.12.0-Linux-x86_64.sh'
  },
  '3.9': {
    x64: 'https://repo.anaconda.com/miniconda/Miniconda3-py39_4.12.0-Linux-x86_64.sh',
    arm64: 'https://repo.anaconda.com/miniconda/Miniconda3-py39_4.12.0-Linux-aarch64.sh'
  },
  '3.10': {
    x64: 'https://repo.anaconda.com/miniconda/Miniconda3-py310_23.3.1-0-Linux-x86_64.sh',
    arm64: 'https://repo.anaconda.com/miniconda/Miniconda3-py310_23.3.1-0-Linux-aarch64.sh'
  },
  '3.11': {
    x64: 'https://repo.anaconda.com/miniconda/Miniconda3-py311_23.5.2-0-Linux-x86_64.sh',
    arm64: 'https://repo.anaconda.com/miniconda/Miniconda3-py311_23.5.2-0-Linux-aarch64.sh'
  },
  'latest': {
    x64: 'https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh',
    arm64: 'https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh'
  }
};

const downloadURL = urls[version] && urls[version][arch];

if (!downloadURL) {
  console.error(`❌ Python version ${version} not supported for architecture ${arch}.`);
  process.exit(1);
}

try {
  console.log(`⬇️  Downloading Miniconda Python ${version} for ${arch}...`);
  execSync(`curl -L ${downloadURL} -o installer.sh`, { stdio: 'inherit' });

  console.log(`🔧 Installing to vendor/python ...`);
  execSync(`bash installer.sh -b -p vendor/python`, { stdio: 'inherit' });

  console.log('✅ Python installed successfully!');
} catch (err) {
  console.error('❌ Failed to install Python:', err);
  process.exit(1);
}
