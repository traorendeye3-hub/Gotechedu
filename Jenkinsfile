pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code source sécurisée...'
                checkout scmGit(
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[
                        credentialsId: 'github-credentials',
                        url: 'https://github.com/traorendeye3-hub/Gotechedu.git'
                    ]]
                )
            }
        }

        stage("Construction de l'image Docker") {
            steps {
                echo "Construction de l'image Docker..."
                bat 'docker build -t gotechedu-frontend:latest .'
            }
        }

        stage('Déploiement') {
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
            echo "Le déploiement a réussi ! Accédez à l'application sur http://localhost:8081"
        }
    }
}