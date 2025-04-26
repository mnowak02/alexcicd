import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';


export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'AwesomePipeline',{
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth',{
        input: CodePipelineSource.gitHub('mnowak02/alexcicd', 'cicd-practice'),
        commands: [
          'ls -al',
          'ls -l',
          'pwd',
          'npm ci',
          'npx cdk synth',
        ],
      })
    });

    const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage',{
      stageName: 'testowy'
    }))


    testStage.addPre(new CodeBuildStep('unit-test', {
      commands: [
        'npm ci',
        'npm test'
      ]
    }))

    testStage.addPre(new CodeBuildStep('unit-testpre', {
      commands: [
        'ls -al'
      ]
    }))

    const testStage1 = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage1',{
      stageName: 'testowy1'
    }))

    testStage1.addPre(new CodeBuildStep('unit-test1', {
      commands: [
        'npm ci',
        'npm test'
      ]
    }))

    testStage1.addPost(new CodeBuildStep('unit-testpost', {
      commands: [
        'ls -al'
      ]
    }))




  }
}
