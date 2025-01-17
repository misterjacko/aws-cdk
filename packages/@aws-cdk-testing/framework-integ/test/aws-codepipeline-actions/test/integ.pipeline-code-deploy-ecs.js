"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codedeploy = require("aws-cdk-lib/aws-codedeploy");
const codepipeline = require("aws-cdk-lib/aws-codepipeline");
const s3 = require("aws-cdk-lib/aws-s3");
const cdk = require("aws-cdk-lib");
const cpactions = require("aws-cdk-lib/aws-codepipeline-actions");
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-codepipeline-codedeploy-ecs');
const application = codedeploy.EcsApplication.fromEcsApplicationName(stack, 'CodeDeployApplication', 'IntegTestDeployApp');
const deploymentGroup = codedeploy.EcsDeploymentGroup.fromEcsDeploymentGroupAttributes(stack, 'CodeDeployGroup', {
    application,
    deploymentGroupName: 'IntegTestDeploymentGroup',
});
const bucket = new s3.Bucket(stack, 'CodeDeployPipelineIntegTest', {
    versioned: true,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
});
const pipeline = new codepipeline.Pipeline(stack, 'Pipeline', {
    artifactBucket: bucket,
});
const sourceStage = pipeline.addStage({ stageName: 'Source' });
const sourceOutput = new codepipeline.Artifact('SourceOutput');
const sourceAction = new cpactions.S3SourceAction({
    actionName: 'S3Source',
    bucketKey: 'application.zip',
    output: sourceOutput,
    bucket,
});
sourceStage.addAction(sourceAction);
const deployStage = pipeline.addStage({ stageName: 'Deploy' });
deployStage.addAction(new cpactions.CodeDeployEcsDeployAction({
    actionName: 'CodeDeploy',
    deploymentGroup,
    taskDefinitionTemplateFile: new codepipeline.ArtifactPath(sourceOutput, 'task-definition-test.json'),
    appSpecTemplateFile: new codepipeline.ArtifactPath(sourceOutput, 'appspec-test.json'),
    containerImageInputs: [
        {
            input: sourceOutput,
            taskDefinitionPlaceholder: 'PLACEHOLDER',
        },
    ],
}));
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcucGlwZWxpbmUtY29kZS1kZXBsb3ktZWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWcucGlwZWxpbmUtY29kZS1kZXBsb3ktZWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQXlEO0FBQ3pELDZEQUE2RDtBQUM3RCx5Q0FBeUM7QUFDekMsbUNBQW1DO0FBQ25DLGtFQUFrRTtBQUVsRSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUUxQixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLHFDQUFxQyxDQUFDLENBQUM7QUFFeEUsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztBQUUzSCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsa0JBQWtCLENBQUMsZ0NBQWdDLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFFO0lBQy9HLFdBQVc7SUFDWCxtQkFBbUIsRUFBRSwwQkFBMEI7Q0FDaEQsQ0FBQyxDQUFDO0FBRUgsTUFBTSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSw2QkFBNkIsRUFBRTtJQUNqRSxTQUFTLEVBQUUsSUFBSTtJQUNmLGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87Q0FDekMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUU7SUFDNUQsY0FBYyxFQUFFLE1BQU07Q0FDdkIsQ0FBQyxDQUFDO0FBRUgsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMvRCxNQUFNLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUM7SUFDaEQsVUFBVSxFQUFFLFVBQVU7SUFDdEIsU0FBUyxFQUFFLGlCQUFpQjtJQUM1QixNQUFNLEVBQUUsWUFBWTtJQUNwQixNQUFNO0NBQ1AsQ0FBQyxDQUFDO0FBQ0gsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVwQyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDL0QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQztJQUM1RCxVQUFVLEVBQUUsWUFBWTtJQUN4QixlQUFlO0lBQ2YsMEJBQTBCLEVBQUUsSUFBSSxZQUFZLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSwyQkFBMkIsQ0FBQztJQUNwRyxtQkFBbUIsRUFBRSxJQUFJLFlBQVksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDO0lBQ3JGLG9CQUFvQixFQUFFO1FBQ3BCO1lBQ0UsS0FBSyxFQUFFLFlBQVk7WUFDbkIseUJBQXlCLEVBQUUsYUFBYTtTQUN6QztLQUNGO0NBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb2RlZGVwbG95IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2RlZGVwbG95JztcbmltcG9ydCAqIGFzIGNvZGVwaXBlbGluZSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY29kZXBpcGVsaW5lJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgY3BhY3Rpb25zIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9ucyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5cbmNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjayhhcHAsICdhd3MtY2RrLWNvZGVwaXBlbGluZS1jb2RlZGVwbG95LWVjcycpO1xuXG5jb25zdCBhcHBsaWNhdGlvbiA9IGNvZGVkZXBsb3kuRWNzQXBwbGljYXRpb24uZnJvbUVjc0FwcGxpY2F0aW9uTmFtZShzdGFjaywgJ0NvZGVEZXBsb3lBcHBsaWNhdGlvbicsICdJbnRlZ1Rlc3REZXBsb3lBcHAnKTtcblxuY29uc3QgZGVwbG95bWVudEdyb3VwID0gY29kZWRlcGxveS5FY3NEZXBsb3ltZW50R3JvdXAuZnJvbUVjc0RlcGxveW1lbnRHcm91cEF0dHJpYnV0ZXMoc3RhY2ssICdDb2RlRGVwbG95R3JvdXAnLCB7XG4gIGFwcGxpY2F0aW9uLFxuICBkZXBsb3ltZW50R3JvdXBOYW1lOiAnSW50ZWdUZXN0RGVwbG95bWVudEdyb3VwJyxcbn0pO1xuXG5jb25zdCBidWNrZXQgPSBuZXcgczMuQnVja2V0KHN0YWNrLCAnQ29kZURlcGxveVBpcGVsaW5lSW50ZWdUZXN0Jywge1xuICB2ZXJzaW9uZWQ6IHRydWUsXG4gIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG59KTtcblxuY29uc3QgcGlwZWxpbmUgPSBuZXcgY29kZXBpcGVsaW5lLlBpcGVsaW5lKHN0YWNrLCAnUGlwZWxpbmUnLCB7XG4gIGFydGlmYWN0QnVja2V0OiBidWNrZXQsXG59KTtcblxuY29uc3Qgc291cmNlU3RhZ2UgPSBwaXBlbGluZS5hZGRTdGFnZSh7IHN0YWdlTmFtZTogJ1NvdXJjZScgfSk7XG5jb25zdCBzb3VyY2VPdXRwdXQgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCdTb3VyY2VPdXRwdXQnKTtcbmNvbnN0IHNvdXJjZUFjdGlvbiA9IG5ldyBjcGFjdGlvbnMuUzNTb3VyY2VBY3Rpb24oe1xuICBhY3Rpb25OYW1lOiAnUzNTb3VyY2UnLFxuICBidWNrZXRLZXk6ICdhcHBsaWNhdGlvbi56aXAnLFxuICBvdXRwdXQ6IHNvdXJjZU91dHB1dCxcbiAgYnVja2V0LFxufSk7XG5zb3VyY2VTdGFnZS5hZGRBY3Rpb24oc291cmNlQWN0aW9uKTtcblxuY29uc3QgZGVwbG95U3RhZ2UgPSBwaXBlbGluZS5hZGRTdGFnZSh7IHN0YWdlTmFtZTogJ0RlcGxveScgfSk7XG5kZXBsb3lTdGFnZS5hZGRBY3Rpb24obmV3IGNwYWN0aW9ucy5Db2RlRGVwbG95RWNzRGVwbG95QWN0aW9uKHtcbiAgYWN0aW9uTmFtZTogJ0NvZGVEZXBsb3knLFxuICBkZXBsb3ltZW50R3JvdXAsXG4gIHRhc2tEZWZpbml0aW9uVGVtcGxhdGVGaWxlOiBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0UGF0aChzb3VyY2VPdXRwdXQsICd0YXNrLWRlZmluaXRpb24tdGVzdC5qc29uJyksXG4gIGFwcFNwZWNUZW1wbGF0ZUZpbGU6IG5ldyBjb2RlcGlwZWxpbmUuQXJ0aWZhY3RQYXRoKHNvdXJjZU91dHB1dCwgJ2FwcHNwZWMtdGVzdC5qc29uJyksXG4gIGNvbnRhaW5lckltYWdlSW5wdXRzOiBbXG4gICAge1xuICAgICAgaW5wdXQ6IHNvdXJjZU91dHB1dCxcbiAgICAgIHRhc2tEZWZpbml0aW9uUGxhY2Vob2xkZXI6ICdQTEFDRUhPTERFUicsXG4gICAgfSxcbiAgXSxcbn0pKTtcblxuYXBwLnN5bnRoKCk7XG4iXX0=