"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ec2 = require("aws-cdk-lib/aws-ec2");
const s3 = require("aws-cdk-lib/aws-s3");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const integ = require("@aws-cdk/integ-tests-alpha");
const fsx = require("aws-cdk-lib/aws-fsx");
const app = new aws_cdk_lib_1.App();
const stack = new aws_cdk_lib_1.Stack(app, 'AwsCdkFsxLustre');
const vpc = new ec2.Vpc(stack, 'VPC');
const bucket = new s3.Bucket(stack, 'ImportBucket', {
    removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
});
const storageCapacity = 1200;
const lustreConfiguration = {
    deploymentType: fsx.LustreDeploymentType.SCRATCH_2,
    importPath: bucket.s3UrlForObject(),
    autoImportPolicy: fsx.LustreAutoImportPolicy.NEW_CHANGED_DELETED,
};
new fsx.LustreFileSystem(stack, 'FsxLustreFileSystem', {
    lustreConfiguration,
    storageCapacityGiB: storageCapacity,
    vpc,
    vpcSubnet: vpc.privateSubnets[0],
    removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
});
new integ.IntegTest(app, 'FsxLustreWithS3Test', {
    testCases: [stack],
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcubHVzdHJlLWZpbGUtc3lzdGVtLXdpdGgtczMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlZy5sdXN0cmUtZmlsZS1zeXN0ZW0td2l0aC1zMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEyQztBQUMzQyx5Q0FBeUM7QUFDekMsNkNBQXdEO0FBQ3hELG9EQUFvRDtBQUNwRCwyQ0FBMkM7QUFFM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBRyxFQUFFLENBQUM7QUFFdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBRWhELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFdEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUU7SUFDbEQsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztDQUNyQyxDQUFDLENBQUM7QUFFSCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDN0IsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixjQUFjLEVBQUUsR0FBRyxDQUFDLG9CQUFvQixDQUFDLFNBQVM7SUFDbEQsVUFBVSxFQUFFLE1BQU0sQ0FBQyxjQUFjLEVBQUU7SUFDbkMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQjtDQUNqRSxDQUFDO0FBRUYsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLHFCQUFxQixFQUFFO0lBQ3JELG1CQUFtQjtJQUNuQixrQkFBa0IsRUFBRSxlQUFlO0lBQ25DLEdBQUc7SUFDSCxTQUFTLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDaEMsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztDQUNyQyxDQUFDLENBQUM7QUFFSCxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLHFCQUFxQixFQUFFO0lBQzlDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztDQUNuQixDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0IHsgQXBwLCBSZW1vdmFsUG9saWN5LCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGludGVnIGZyb20gJ0Bhd3MtY2RrL2ludGVnLXRlc3RzLWFscGhhJztcbmltcG9ydCAqIGFzIGZzeCBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZnN4JztcblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuXG5jb25zdCBzdGFjayA9IG5ldyBTdGFjayhhcHAsICdBd3NDZGtGc3hMdXN0cmUnKTtcblxuY29uc3QgdnBjID0gbmV3IGVjMi5WcGMoc3RhY2ssICdWUEMnKTtcblxuY29uc3QgYnVja2V0ID0gbmV3IHMzLkJ1Y2tldChzdGFjaywgJ0ltcG9ydEJ1Y2tldCcsIHtcbiAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxufSk7XG5cbmNvbnN0IHN0b3JhZ2VDYXBhY2l0eSA9IDEyMDA7XG5jb25zdCBsdXN0cmVDb25maWd1cmF0aW9uID0ge1xuICBkZXBsb3ltZW50VHlwZTogZnN4Lkx1c3RyZURlcGxveW1lbnRUeXBlLlNDUkFUQ0hfMixcbiAgaW1wb3J0UGF0aDogYnVja2V0LnMzVXJsRm9yT2JqZWN0KCksXG4gIGF1dG9JbXBvcnRQb2xpY3k6IGZzeC5MdXN0cmVBdXRvSW1wb3J0UG9saWN5Lk5FV19DSEFOR0VEX0RFTEVURUQsXG59O1xuXG5uZXcgZnN4Lkx1c3RyZUZpbGVTeXN0ZW0oc3RhY2ssICdGc3hMdXN0cmVGaWxlU3lzdGVtJywge1xuICBsdXN0cmVDb25maWd1cmF0aW9uLFxuICBzdG9yYWdlQ2FwYWNpdHlHaUI6IHN0b3JhZ2VDYXBhY2l0eSxcbiAgdnBjLFxuICB2cGNTdWJuZXQ6IHZwYy5wcml2YXRlU3VibmV0c1swXSxcbiAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxufSk7XG5cbm5ldyBpbnRlZy5JbnRlZ1Rlc3QoYXBwLCAnRnN4THVzdHJlV2l0aFMzVGVzdCcsIHtcbiAgdGVzdENhc2VzOiBbc3RhY2tdLFxufSk7XG5cbmFwcC5zeW50aCgpO1xuIl19