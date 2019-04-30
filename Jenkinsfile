#!groovy

def proj_name = "audiencesutra"
def script_file_name="audiencesutra.sh"  
def slack_channel="websitenconnections"
def slack_baseURL = "https://anirbanait.slack.com/services/hooks/jenkins-ci/"
//def slack_secret = "rQXwfeFyracuAwRmRoB0U29s"
def slack_tokenid = "audiencesutra"


 def slackMsg(emoji, buildmsg,m1,m2,m3,m4 ) {
    def msg =   ":${emoji}: *${buildmsg}*: `${env.JOB_NAME}#${env.BUILD_NUMBER}`\n\n"+
                "*${m1}*: `${m2}`\n"+
                "_${m3}:_\n"+
                "```${m4}```\n"+
                "<${env.BUILD_URL}|Open in Jenkins>"
    return msg;
}

def sendMail(details) {
    emailext (
      subject: "JENKINS - ${JOB_NAME} (${BUILD_NUMBER}) FAILED!",
      body: details,
      recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider'],[$class: 'CulpritsRecipientProvider']]
    )
}


node {

    try {
        
        stage 'Checkout'
            updateGitlabCommitStatus name: 'Checkout', state: 'pending'
            checkout scm
            sh "git log HEAD^..HEAD --pretty='%h %an - %s' > ${proj_name}_GIT_CHANGES"
            def lastChanges = readFile("${proj_name}_GIT_CHANGES")
            updateGitlabCommitStatus name: 'Checkout', state: 'success'
          

        stage 'Deploy'  
           updateGitlabCommitStatus name: 'Deploy', state: 'pending'
           
           /* NOTE: in cse of $ in script use \ char */
           //sh "~/git_deploy/onetime.sh groupquality 'jX\$uYOrFfD'"
            def status = sh(returnStatus: true, script: ". ~/git_deploy/${script_file_name} > ${proj_name}_sh_output.txt")
            
            def output = readFile("${proj_name}_sh_output.txt").trim() 
            print output
            def echo_status = output.split('\n')
            def sh_SuccessMsg=""
                
            if (status != 0) {
                def sh_ErrorMsg = echo_status.findAll { it.contains('ERROR:-') }.join('\n')
                def errmsg = slackMsg('x','Build Failed','REASON',sh_ErrorMsg,'Git Commits',lastChanges)
                slackSend channel: slack_channel, color: "danger", message: errmsg, baseUrl: slack_baseURL, tokenCredentialId: slack_tokenid
                currentBuild.result = 'ABORTED'
                sendMail(output)
                updateGitlabCommitStatus name: 'Deploy', state: 'failed'
                error('-STOP-')
                
                
            }
            else
            {
                 sh_SuccessMsg = echo_status.findAll { it.contains('DONE:-') }.join('\n')
                 updateGitlabCommitStatus name: 'Deploy', state: 'success'   
                
            }
            sh "rm ${proj_name}_sh_output.txt"
            

         stage 'Publish results' 
            if(currentBuild.result != 'ABORTED')
            {
                def msg =slackMsg('trophy','Build Sucessful','SH Response',sh_SuccessMsg,'Git Commits', lastChanges)
                slackSend channel: slack_channel, color: "good", message: msg, baseUrl: slack_baseURL, tokenCredentialId: slack_tokenid
                updateGitlabCommitStatus name: 'Pubish Results', state: 'success'
                
            }

    }

    catch (err) {
        
        def exp_error = err.toString()
        if (!exp_error.contains('-STOP-'))
        {
            updateGitlabCommitStatus name: 'Deploy', state: 'failed'
            def errmsg = slackMsg('x','Build Failed','REASON','Unexpected Error','Exception',exp_error)
            slackSend channel: slack_channel, color: "danger", message: errmsg, baseUrl: slack_baseURL, tokenCredentialId: slack_tokenid
        }
        throw err
    }

} 
