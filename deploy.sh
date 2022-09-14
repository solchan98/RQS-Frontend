sudo rm -rf build
sudo gcloud alpha storage cp gs://front-build/build.tar ./
sudo tar -xvf build.tar
sudo systemctl restart nginx