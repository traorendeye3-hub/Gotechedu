pipeline {
    agent any

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
                // Stoppe et supprime l'ancien conteneur s'il existe déjà
                bat 'docker stop gotechedu-app || exit 0'
                bat 'docker rm gotechedu-app || exit 0'
                // Lance le nouveau conteneur sur le port 80 (ou un autre port libre, ex: 8081)
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