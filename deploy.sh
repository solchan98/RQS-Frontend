sudo rm -rf build
sudo gcloud alpha storage cp gs://front-deploy/build.tar ./
sudo tar -xvf build.tar
sudo systemctl restart nginx