def name = "streamjar/developers:${BRANCH_NAME}-${BUILD_NUMBER}"

node {
	stage("Checkout") {
		checkout scm
	}

	def app

	docker.withRegistry('https://docker.sjsrv.uk') {
		stage("Copy Config") {
			configFileProvider([configFile(fileId: '498dfc07-fa10-4752-a9af-898807b5f44a', variable: 'CONFIG_FILE')]) {
				sh 'cat $CONFIG_FILE > config.ts'
			}
		}

		stage("Build") {
			app = docker.build name
		}

		if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "develop") {
			stage("Push") {
				app.push()
			}
		}
	}

	sh "docker rmi ${name}"
}
