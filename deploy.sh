#!/bin/bash

echo "SSH into EC2 instance..."
ssh -i ../EC2/bf_keypair.pem ec2-user@3.80.211.117 << 'ENDSSH'

echo "Pulling changes and restarting processes..."
  cd workout-generator
  git pull
  pm2 restart all
  echo "Deployment complete!"
ENDSSH
