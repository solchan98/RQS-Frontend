sudo rm -rf build
sudo gcloud alpha storage cp gs://quiz-box/build.tar ./
sudo tar -xvf build.tar
sudo systemctl restart nginx