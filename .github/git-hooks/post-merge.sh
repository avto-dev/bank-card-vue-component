#!/usr/bin/env sh
set -e;

# Will executed after `git pull`
#
# Install this hook using next command: `make git-hooks`

changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)";

# Using `sh` - do not use "function" keyword for functions declaration (!)
check_run() {
  echo "$changed_files" | grep --quiet "$1" && eval "$2"
}

check_run package-lock.json "RUN_INTERACTIVE='' make install";
