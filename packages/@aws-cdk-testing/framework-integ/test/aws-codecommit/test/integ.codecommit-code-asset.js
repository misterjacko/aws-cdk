"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib");
const codecommit = require("aws-cdk-lib/aws-codecommit");
const aws_codecommit_1 = require("aws-cdk-lib/aws-codecommit");
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-codecommit-repo-contents-assets');
new codecommit.Repository(stack, 'Repo', {
    repositoryName: 'aws-cdk-codecommit-repo-contents-assets',
    code: aws_codecommit_1.Code.fromDirectory('./asset-test'),
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuY29kZWNvbW1pdC1jb2RlLWFzc2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWcuY29kZWNvbW1pdC1jb2RlLWFzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1DO0FBQ25DLHlEQUF5RDtBQUN6RCwrREFBa0Q7QUFFbEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSx5Q0FBeUMsQ0FBQyxDQUFDO0FBRTVFLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0lBQ3ZDLGNBQWMsRUFBRSx5Q0FBeUM7SUFDekQsSUFBSSxFQUFFLHFCQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztDQUN6QyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgY29kZWNvbW1pdCBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY29kZWNvbW1pdCc7XG5pbXBvcnQgeyBDb2RlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZGVjb21taXQnO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKGFwcCwgJ2F3cy1jZGstY29kZWNvbW1pdC1yZXBvLWNvbnRlbnRzLWFzc2V0cycpO1xuXG5uZXcgY29kZWNvbW1pdC5SZXBvc2l0b3J5KHN0YWNrLCAnUmVwbycsIHtcbiAgcmVwb3NpdG9yeU5hbWU6ICdhd3MtY2RrLWNvZGVjb21taXQtcmVwby1jb250ZW50cy1hc3NldHMnLFxuICBjb2RlOiBDb2RlLmZyb21EaXJlY3RvcnkoJy4vYXNzZXQtdGVzdCcpLFxufSk7XG5cbmFwcC5zeW50aCgpO1xuIl19