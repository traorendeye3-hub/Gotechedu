pipeline {
    agent any

    environment {
        // Inclut System32 pour cmd.exe ET le dossier de Docker
        PATH = "C:\\Windows\\System32;C:\\Program Files\\Docker\\Docker\\resources\\bin;${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code source...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Construction de l image Docker...'
                bat 'docker build -t gotechedu-frontend:latest .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Déploiement du conteneur...'
                bat 'docker stop gotechedu-app || exit 0'
                bat 'docker rm gotechedu-app || exit 0'
                bat 'docker run -d --name gotechedu-app -p 8081:80 gotechedu-frontend:latest'
            }
        }
    }

    post {
        success {
            echo 'Le déploiement a réussi ! Accédez à l application sur http://localhost:8081'
        }
        failure {
            echo 'Le déploiement a échoué. Vérifiez les logs.'
        }
    }
}