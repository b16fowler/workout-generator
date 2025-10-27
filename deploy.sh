#!/bin/bash

echo "Building project..."
npm run build

echo "Moving build/ to EC2..."
scp -i ../EC2/bf_keypair.pem -r build ec2-user@3.80.211.117:/home/ec2-user/

echo "Deploying on EC2..."
ssh -i ../EC2/bf_keypair.pem ec2-user@3.80.211.117 << 'ENDSSH'
  sudo rm -r /var/www/my-react-app/build/
  sudo mv ~/build /var/www/my-react-app/
  pm2 restart server
  echo "Deployment complete!"
ENDSSH
