pipeline {
    agent any
    stages {
        stage('Verify tooling') {
            steps {
                sh '''
                docker version
                docker info
                docker compose version
                curl --version
                jq --version
                '''
            }
        }
        stage('Start container'){
            steps{
                sh 'docker compose up -d --no-color --wait'
                sh 'docker compose ps'
            }
        }
        stage('Run tests against the container'){
            steps{
                sh 'http://localhost/'
            }
        }
    }
}
