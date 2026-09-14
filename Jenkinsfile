pipeline {

    agent any


    tools {
        nodejs "NodeJS-24"
    }


    stages {


        stage('Checkout Code') {

            steps {

                git branch: 'main',
                url: 'https://github.com/MutahirTayyab/NodeJS-Website-CICD-Windows-Server.git'

            }
        }


        stage('Install Dependencies') {

            steps {

                bat 'npm install'

            }

        }


        stage('Deploy Files') {

            steps {

                bat '''
                xcopy /E /I /Y C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\NodeJS-Website-Windows-Server\\* C:\\inetpub\\wwwroot\\NodeJS-Website-CICD-Windows-Server\\
                '''

            }

        }


        stage('Restart Application') {

            steps {

                bat '''
                set PATH=%PATH%;C:\\Users\\Mutahir Tayyab\\AppData\\Roaming\\npm
                pm2 restart mutahir-portfolio
                '''

            }

        }


    }

}