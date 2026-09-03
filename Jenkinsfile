pipeline {

    agent any

    tools {
        nodejs "NodeJS-24"
    }


    stages {


        stage('Checkout Code') {

            steps {

                git branch: 'main',
                url: 'https://github.com/MutahirTayyab/mutahir-devops-portfolio.git'

            }

        }


        stage('Install Dependencies') {

            steps {

                bat 'npm install'

            }

        }


stage('Deploy Application') {
    steps {
        bat '''
        set PATH=%PATH%;C:\\Users\\Mutahir Tayyab\\AppData\\Roaming\\npm
        pm2 restart mutahir-portfolio
        '''
    }
}


    }


}