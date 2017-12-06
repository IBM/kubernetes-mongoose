#!/bin/bash -e

# shellcheck disable=SC1090
source "$(dirname "$0")"/../scripts/resources.sh

main(){
    for DIRECTORY in ./containers/*; do
        pushd "$DIRECTORY"
        if ! docker build --quiet .; then
            test_failed "$0"
        fi
        popd
    done
    test_passed "$0"
}

main "$@"
