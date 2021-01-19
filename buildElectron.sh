ionic cordova build browser --prod
rm -r www/*
cp -r platforms/browser/www/* www/
npm start