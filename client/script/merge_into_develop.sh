git pull

git checkout develop
git pull

git checkout @{-1}
git merge develop --no-ff
git push

git checkout develop
git merge @{-1} --no-ff
git push

git checkout @{-1}