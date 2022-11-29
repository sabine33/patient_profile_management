# yarn build && cd build && git init && git add . && git commit -m "Deployment release" && git remote add production ssh://techbyte@23.106.120.XXX/home/techbyte/ppm.git && git push production master --force
rm -r dist/
yarn build && git add . && git commit -m "Build updates" && git push origin staging