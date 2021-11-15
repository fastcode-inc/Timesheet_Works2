
#####PLEASE FOLLOW THE INSTRUCTIONS BELOW TO RUN AND LOGIN TO THE APPLICATION.#####


1. Please ensure that you have DOCKER Desktop installed on your local machine. You can download and install it from the following location: https://www.docker.com/products/docker-desktop

2. Please run the following docker command from this directory. 

Windows
=======
PowerShell.exe -ExecutionPolicy Bypass -File install.ps1

Linux / Mac
===========
./install.sh

This command will create three different containers with pre-installed dependencies and run the generated application. If you added the reporting add-on, the command will create four different containers.

The front-end UI will run on port 4700 and the back-end API will run on port 5555.

3. Login to the Application using the instructions provided on the following page: https://dash.readme.com/project/getfastcode/v1.0/docs/generated-app-login