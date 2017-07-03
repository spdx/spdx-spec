#!/bin/bash
#
# Shell script for deploying HTML builds
# to the gh-pages branch of github.com/spdx/spdx-spec
#
# Credits: https://stanislav.se/encrypt-github-deploy-key-with-travis-ci/
#          https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

set -x

SOURCE_BRANCH="master"
SSH_REPO="git@github.com:spdx/spdx-spec.git"

# Pull requests and commits to other branches shouldn't be deployed
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deployment"
    exit 0
else
    # Only proceed if key for decrypting deployment SSH keys is set
    if env | grep ^encrypted_0222e5876250_key= > /dev/null; then
        echo "Deploying to GitHub pages"
    
        # Set Git committer, email and remote server
        git config user.name "Travis CI"
        git config user.email "notifications@travis-ci.org"
        git remote set-url origin $SSH_REPO
    
        # Decrypt private key
        openssl aes-256-cbc -K $encrypted_0222e5876250_key -iv $encrypted_0222e5876250_iv -in $TRAVIS_BUILD_DIR/.travis/deploy-key.enc -out $TRAVIS_BUILD_DIR/.travis/deploy-key -d
    
        # Set file permissions so SSH accepts private key
        chmod 600 $TRAVIS_BUILD_DIR/.travis/deploy-key

        # Start the ssh agent
        eval "$(ssh-agent -s)"
    
        # Add key to SSH
        ssh-add $TRAVIS_BUILD_DIR/.travis/deploy-key

        # Execute publish to GitHub pages. See also related task in gulpfile.js
        gulp publish
    else
        echo "Skipping deployment to GitHub pages - deploy env variable not set"
    fi
fi