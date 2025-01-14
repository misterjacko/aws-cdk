"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_autoscaling_1 = require("aws-cdk-lib/aws-autoscaling");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const aws_ecs_1 = require("aws-cdk-lib/aws-ecs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const integ = require("@aws-cdk/integ-tests-alpha");
const aws_ecs_patterns_1 = require("aws-cdk-lib/aws-ecs-patterns");
const app = new aws_cdk_lib_1.App();
const stack = new aws_cdk_lib_1.Stack(app, 'aws-ecs-integ-nlb');
const vpc = new aws_ec2_1.Vpc(stack, 'Vpc', { maxAzs: 2 });
const cluster = new aws_ecs_1.Cluster(stack, 'Cluster', { vpc });
const provider1 = new aws_ecs_1.AsgCapacityProvider(stack, 'FirstCapacityProvider', {
    autoScalingGroup: new aws_autoscaling_1.AutoScalingGroup(stack, 'FirstAutoScalingGroup', {
        vpc,
        instanceType: new aws_ec2_1.InstanceType('t2.micro'),
        machineImage: aws_ecs_1.EcsOptimizedImage.amazonLinux2(),
    }),
    capacityProviderName: 'first-capacity-provider',
});
cluster.addAsgCapacityProvider(provider1);
const provider2 = new aws_ecs_1.AsgCapacityProvider(stack, 'SecondCapacityProvider', {
    autoScalingGroup: new aws_autoscaling_1.AutoScalingGroup(stack, 'SecondAutoScalingGroup', {
        vpc,
        instanceType: new aws_ec2_1.InstanceType('t3.micro'),
        machineImage: aws_ecs_1.EcsOptimizedImage.amazonLinux2(),
    }),
    capacityProviderName: 'second-capacity-provider',
});
cluster.addAsgCapacityProvider(provider2);
// one service with multi capacity provider strategies
new aws_ecs_patterns_1.NetworkLoadBalancedEc2Service(stack, 'myService', {
    cluster,
    memoryLimitMiB: 256,
    taskImageOptions: {
        image: aws_ecs_1.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
    },
    capacityProviderStrategies: [
        {
            capacityProvider: provider1.capacityProviderName,
            base: 1,
            weight: 1,
        },
        {
            capacityProvider: provider2.capacityProviderName,
            base: 0,
            weight: 2,
        },
    ],
});
new integ.IntegTest(app, 'networkLoadBalancedEc2ServiceTest', {
    testCases: [stack],
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcubmV0d29yay1sb2FkLWJhbGFuY2VkLWVjcy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWcubmV0d29yay1sb2FkLWJhbGFuY2VkLWVjcy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQStEO0FBQy9ELGlEQUF3RDtBQUN4RCxpREFBc0c7QUFDdEcsNkNBQXlDO0FBQ3pDLG9EQUFvRDtBQUNwRCxtRUFBNkU7QUFFN0UsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBSyxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNqRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFFdkQsTUFBTSxTQUFTLEdBQUcsSUFBSSw2QkFBbUIsQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLEVBQUU7SUFDeEUsZ0JBQWdCLEVBQUUsSUFBSSxrQ0FBZ0IsQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLEVBQUU7UUFDckUsR0FBRztRQUNILFlBQVksRUFBRSxJQUFJLHNCQUFZLENBQUMsVUFBVSxDQUFDO1FBQzFDLFlBQVksRUFBRSwyQkFBaUIsQ0FBQyxZQUFZLEVBQUU7S0FDL0MsQ0FBQztJQUNGLG9CQUFvQixFQUFFLHlCQUF5QjtDQUNoRCxDQUFDLENBQUM7QUFDSCxPQUFPLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFMUMsTUFBTSxTQUFTLEdBQUcsSUFBSSw2QkFBbUIsQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLEVBQUU7SUFDekUsZ0JBQWdCLEVBQUUsSUFBSSxrQ0FBZ0IsQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLEVBQUU7UUFDdEUsR0FBRztRQUNILFlBQVksRUFBRSxJQUFJLHNCQUFZLENBQUMsVUFBVSxDQUFDO1FBQzFDLFlBQVksRUFBRSwyQkFBaUIsQ0FBQyxZQUFZLEVBQUU7S0FDL0MsQ0FBQztJQUNGLG9CQUFvQixFQUFFLDBCQUEwQjtDQUNqRCxDQUFDLENBQUM7QUFDSCxPQUFPLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFMUMsc0RBQXNEO0FBQ3RELElBQUksZ0RBQTZCLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRTtJQUNwRCxPQUFPO0lBQ1AsY0FBYyxFQUFFLEdBQUc7SUFDbkIsZ0JBQWdCLEVBQUU7UUFDaEIsS0FBSyxFQUFFLHdCQUFjLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDO0tBQy9EO0lBQ0QsMEJBQTBCLEVBQUU7UUFDMUI7WUFDRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsb0JBQW9CO1lBQ2hELElBQUksRUFBRSxDQUFDO1lBQ1AsTUFBTSxFQUFFLENBQUM7U0FDVjtRQUNEO1lBQ0UsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLG9CQUFvQjtZQUNoRCxJQUFJLEVBQUUsQ0FBQztZQUNQLE1BQU0sRUFBRSxDQUFDO1NBQ1Y7S0FDRjtDQUNGLENBQUMsQ0FBQztBQUVILElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsbUNBQW1DLEVBQUU7SUFDNUQsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDO0NBQ25CLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dG9TY2FsaW5nR3JvdXAgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXV0b3NjYWxpbmcnO1xuaW1wb3J0IHsgSW5zdGFuY2VUeXBlLCBWcGMgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcbmltcG9ydCB7IENsdXN0ZXIsIENvbnRhaW5lckltYWdlLCBBc2dDYXBhY2l0eVByb3ZpZGVyLCBFY3NPcHRpbWl6ZWRJbWFnZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lY3MnO1xuaW1wb3J0IHsgQXBwLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGludGVnIGZyb20gJ0Bhd3MtY2RrL2ludGVnLXRlc3RzLWFscGhhJztcbmltcG9ydCB7IE5ldHdvcmtMb2FkQmFsYW5jZWRFYzJTZXJ2aWNlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjcy1wYXR0ZXJucyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmNvbnN0IHN0YWNrID0gbmV3IFN0YWNrKGFwcCwgJ2F3cy1lY3MtaW50ZWctbmxiJyk7XG5jb25zdCB2cGMgPSBuZXcgVnBjKHN0YWNrLCAnVnBjJywgeyBtYXhBenM6IDIgfSk7XG5jb25zdCBjbHVzdGVyID0gbmV3IENsdXN0ZXIoc3RhY2ssICdDbHVzdGVyJywgeyB2cGMgfSk7XG5cbmNvbnN0IHByb3ZpZGVyMSA9IG5ldyBBc2dDYXBhY2l0eVByb3ZpZGVyKHN0YWNrLCAnRmlyc3RDYXBhY2l0eVByb3ZpZGVyJywge1xuICBhdXRvU2NhbGluZ0dyb3VwOiBuZXcgQXV0b1NjYWxpbmdHcm91cChzdGFjaywgJ0ZpcnN0QXV0b1NjYWxpbmdHcm91cCcsIHtcbiAgICB2cGMsXG4gICAgaW5zdGFuY2VUeXBlOiBuZXcgSW5zdGFuY2VUeXBlKCd0Mi5taWNybycpLFxuICAgIG1hY2hpbmVJbWFnZTogRWNzT3B0aW1pemVkSW1hZ2UuYW1hem9uTGludXgyKCksXG4gIH0pLFxuICBjYXBhY2l0eVByb3ZpZGVyTmFtZTogJ2ZpcnN0LWNhcGFjaXR5LXByb3ZpZGVyJyxcbn0pO1xuY2x1c3Rlci5hZGRBc2dDYXBhY2l0eVByb3ZpZGVyKHByb3ZpZGVyMSk7XG5cbmNvbnN0IHByb3ZpZGVyMiA9IG5ldyBBc2dDYXBhY2l0eVByb3ZpZGVyKHN0YWNrLCAnU2Vjb25kQ2FwYWNpdHlQcm92aWRlcicsIHtcbiAgYXV0b1NjYWxpbmdHcm91cDogbmV3IEF1dG9TY2FsaW5nR3JvdXAoc3RhY2ssICdTZWNvbmRBdXRvU2NhbGluZ0dyb3VwJywge1xuICAgIHZwYyxcbiAgICBpbnN0YW5jZVR5cGU6IG5ldyBJbnN0YW5jZVR5cGUoJ3QzLm1pY3JvJyksXG4gICAgbWFjaGluZUltYWdlOiBFY3NPcHRpbWl6ZWRJbWFnZS5hbWF6b25MaW51eDIoKSxcbiAgfSksXG4gIGNhcGFjaXR5UHJvdmlkZXJOYW1lOiAnc2Vjb25kLWNhcGFjaXR5LXByb3ZpZGVyJyxcbn0pO1xuY2x1c3Rlci5hZGRBc2dDYXBhY2l0eVByb3ZpZGVyKHByb3ZpZGVyMik7XG5cbi8vIG9uZSBzZXJ2aWNlIHdpdGggbXVsdGkgY2FwYWNpdHkgcHJvdmlkZXIgc3RyYXRlZ2llc1xubmV3IE5ldHdvcmtMb2FkQmFsYW5jZWRFYzJTZXJ2aWNlKHN0YWNrLCAnbXlTZXJ2aWNlJywge1xuICBjbHVzdGVyLFxuICBtZW1vcnlMaW1pdE1pQjogMjU2LFxuICB0YXNrSW1hZ2VPcHRpb25zOiB7XG4gICAgaW1hZ2U6IENvbnRhaW5lckltYWdlLmZyb21SZWdpc3RyeSgnYW1hem9uL2FtYXpvbi1lY3Mtc2FtcGxlJyksXG4gIH0sXG4gIGNhcGFjaXR5UHJvdmlkZXJTdHJhdGVnaWVzOiBbXG4gICAge1xuICAgICAgY2FwYWNpdHlQcm92aWRlcjogcHJvdmlkZXIxLmNhcGFjaXR5UHJvdmlkZXJOYW1lLFxuICAgICAgYmFzZTogMSxcbiAgICAgIHdlaWdodDogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGNhcGFjaXR5UHJvdmlkZXI6IHByb3ZpZGVyMi5jYXBhY2l0eVByb3ZpZGVyTmFtZSxcbiAgICAgIGJhc2U6IDAsXG4gICAgICB3ZWlnaHQ6IDIsXG4gICAgfSxcbiAgXSxcbn0pO1xuXG5uZXcgaW50ZWcuSW50ZWdUZXN0KGFwcCwgJ25ldHdvcmtMb2FkQmFsYW5jZWRFYzJTZXJ2aWNlVGVzdCcsIHtcbiAgdGVzdENhc2VzOiBbc3RhY2tdLFxufSk7XG5cbmFwcC5zeW50aCgpO1xuIl19