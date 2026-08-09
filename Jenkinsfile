pipeline {
    agent any

    stages {
        stage('Test Docker') {
            steps {
                bat 'docker --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t gotechedu-frontend:latest .'
            }
        }
    }
}