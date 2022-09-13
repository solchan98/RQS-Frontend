sudo rm -rf build
sudo mkdir build
sudo gcloud alpha storage cp gs://front-build/build/* ./build
sudo systemctl reload nginx