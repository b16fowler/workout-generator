#!/bin/bash

echo "Building project..."
npm run build

echo "Zipping build folder..."
zip -r build.zip build

echo "Uploading to EC2..."
scp -i ../EC2/bf_keypair.pem build.zip ec2-user@3.80.211.117:/home/ec2-user/

echo "Deploying on EC2..."
ssh -i ../EC2/bf_keypair.pem ec2-user@3.80.211.117 << 'ENDSSH'
  cd /home/ec2-user
  unzip -o build.zip -d /var/www/my-react-app/
  rm build.zip
  echo "Deployment complete!"
ENDSSH
