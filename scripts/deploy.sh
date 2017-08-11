#!/bin/bash
echo "Setting username and email"
git config --global user.email "$USER_EMAIL"
git config --global user.name "$USER_NAME"

echo "Checking out the $1 branch"
git checkout -b "$1"
echo "Merging with master"
git merge master
echo "Add the build catalog"
git add -f --all build/
echo "Commit it"
git commit --author="$USER_NAME <$USER_EMAIL>" -m "$CIRCLE_BRANCH build#$CIRCLE_BUILD_NUM"
echo "Push to origin"
git push --force --set-upstream origin $1
echo "Done."
