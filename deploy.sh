# yarn build && cd build && git init && git add . && git commit -m "Deployment release" && git remote add production ssh://techbyte@23.106.120.XXX/home/techbyte/ppm.git && git push production master --force
yarn build && git add . && git commit -m "Recent updates" && git push origin staging