#!/usr/bin/env sh
set -e;

# Install this hook using next command: `make git-hooks`

if [ ! -d "$(pwd)/node_modules" ]; then
  RUN_INTERACTIVE='' make install;
fi;

if ! RUN_INTERACTIVE='' make test; then
  echo;
  echo "  Error: Checks failed. Try to run \"make fix\", double check tests sources, and then repeat your last command.";
  echo "         For skipping - use \"git ... --no-verify\" argument";
  echo;
  exit 1;
fi;
