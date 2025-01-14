"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const s3 = require("aws-cdk-lib/aws-s3");
const cdk = require("aws-cdk-lib");
const integ = require("@aws-cdk/integ-tests-alpha");
const s3deploy = require("aws-cdk-lib/aws-s3-deployment");
class TestBucketDeployment extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.bucket = new s3.Bucket(this, 'Destination', {
            publicReadAccess: false,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true, // needed for integration test cleanup
        });
        const deploy = new s3deploy.BucketDeployment(this, 'DeployMe5', {
            sources: [s3deploy.Source.asset(path.join(__dirname, 'my-website-second'))],
            destinationBucket: this.bucket,
            retainOnDelete: false, // default is true, which will block the integration test cleanup
        });
        this.exportValue(deploy.deployedBucket.bucketWebsiteUrl, {
            name: 'WebsiteUrl',
        });
    }
}
const app = new cdk.App();
const testCase = new TestBucketDeployment(app, 'test-bucket-deployment-deployed-bucket');
new integ.IntegTest(app, 'integ-test-bucket-deployments', {
    testCases: [testCase],
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuYnVja2V0LWRlcGxveW1lbnQtZGVwbG95ZWQtYnVja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWcuYnVja2V0LWRlcGxveW1lbnQtZGVwbG95ZWQtYnVja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLHlDQUF5QztBQUN6QyxtQ0FBbUM7QUFDbkMsb0RBQW9EO0FBRXBELDBEQUEwRDtBQUUxRCxNQUFNLG9CQUFxQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBRTFDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUMvQyxnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87WUFDeEMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLHNDQUFzQztTQUNoRSxDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRyxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQzlELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUMzRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUM5QixjQUFjLEVBQUUsS0FBSyxFQUFFLGlFQUFpRTtTQUN6RixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkQsSUFBSSxFQUFFLFlBQVk7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztBQUd6RixJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLCtCQUErQixFQUFFO0lBQ3hELFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztDQUN0QixDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgczMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpbnRlZyBmcm9tICdAYXdzLWNkay9pbnRlZy10ZXN0cy1hbHBoYSc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIHMzZGVwbG95IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMy1kZXBsb3ltZW50JztcblxuY2xhc3MgVGVzdEJ1Y2tldERlcGxveW1lbnQgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBwdWJsaWMgcmVhZG9ubHkgYnVja2V0OiBzMy5JQnVja2V0O1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICB0aGlzLmJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ0Rlc3RpbmF0aW9uJywge1xuICAgICAgcHVibGljUmVhZEFjY2VzczogZmFsc2UsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgICAgYXV0b0RlbGV0ZU9iamVjdHM6IHRydWUsIC8vIG5lZWRlZCBmb3IgaW50ZWdyYXRpb24gdGVzdCBjbGVhbnVwXG4gICAgfSk7XG5cbiAgICBjb25zdCBkZXBsb3kgPSBuZXcgczNkZXBsb3kuQnVja2V0RGVwbG95bWVudCh0aGlzLCAnRGVwbG95TWU1Jywge1xuICAgICAgc291cmNlczogW3MzZGVwbG95LlNvdXJjZS5hc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnbXktd2Vic2l0ZS1zZWNvbmQnKSldLFxuICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IHRoaXMuYnVja2V0LFxuICAgICAgcmV0YWluT25EZWxldGU6IGZhbHNlLCAvLyBkZWZhdWx0IGlzIHRydWUsIHdoaWNoIHdpbGwgYmxvY2sgdGhlIGludGVncmF0aW9uIHRlc3QgY2xlYW51cFxuICAgIH0pO1xuXG4gICAgdGhpcy5leHBvcnRWYWx1ZShkZXBsb3kuZGVwbG95ZWRCdWNrZXQuYnVja2V0V2Vic2l0ZVVybCwge1xuICAgICAgbmFtZTogJ1dlYnNpdGVVcmwnLFxuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5jb25zdCB0ZXN0Q2FzZSA9IG5ldyBUZXN0QnVja2V0RGVwbG95bWVudChhcHAsICd0ZXN0LWJ1Y2tldC1kZXBsb3ltZW50LWRlcGxveWVkLWJ1Y2tldCcpO1xuXG5cbm5ldyBpbnRlZy5JbnRlZ1Rlc3QoYXBwLCAnaW50ZWctdGVzdC1idWNrZXQtZGVwbG95bWVudHMnLCB7XG4gIHRlc3RDYXNlczogW3Rlc3RDYXNlXSxcbn0pO1xuXG5hcHAuc3ludGgoKTtcbiJdfQ==