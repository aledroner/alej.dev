# !/bin/bash
# deploy_config.sh
# This script updates Firebase Environment Variables at deployment

cd src/environments
sed -i 's/\(API_KEY\)/'$API_KEY'/' environment.prod.ts
sed -i 's/\(PROJECT_ID\)/'$PROJECT_ID'/' environment.prod.ts
sed -i 's/\(MESSAGING_SENDER_ID\)/'$MESSAGING_SENDER_ID'/' environment.prod.ts
sed -i 's/\(APP_ID\)/'$APP_ID'/' environment.prod.ts
cat environment.prod.ts

# Update .firebaserc
cd ../..
sed -i 's/\(PROJECT_ID_DEV\)/'$PROJECT_ID_DEV'/' .firebaserc
sed -i 's/\(PROJECT_ID\)/'$PROJECT_ID'/' .firebaserc