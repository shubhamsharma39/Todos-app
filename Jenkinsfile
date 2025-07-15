pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "shubham0039sharma"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/shubhamsharma39/Todos-app.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('todo-backend') {
                    sh 'docker build -t $DOCKERHUB_USER/todos-backend:latest .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('todo-frontend') {
                    sh 'docker build --build-arg REACT_APP_BACKEND_URL=http://15.207.121.39:3002 -t $DOCKERHUB_USER/todos-frontend:latest .'
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh 'docker push $DOCKERHUB_USER/todos-backend:latest'
                    sh 'docker push $DOCKERHUB_USER/todos-frontend:latest'
                }
            }
        }

        st
