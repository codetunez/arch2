# build library
cd library
npm i
npm link
cd -

# build client
cd client
# the legacy peer deps flag is to support the older react version in blocks
npm i --legacy-peer-deps
npm link library --legacy-peer-deps
cd -

# build middle
cd middle
npm i
cd -

# build server
cd server
npm i
cd -