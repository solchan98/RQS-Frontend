sudo rm -rf build
sudo gcloud alpha storage cp gs://quizbox-deploy/build.tar ./
sudo tar -xvf build.tar
sudo systemctl restart nginx