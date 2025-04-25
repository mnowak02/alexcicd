// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as CdkCicd from '../lib/cdk-cicd-stack';

import { handler } from "../services/hello"

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk-cicd-stack.ts
//test('SQS Queue Created', () => {
//
//});


describe('Gello describe test suitr', ()=>{

    test('handler should return 200', async ()=>{
        const result = await handler({}, {})
        expect(result.statusCode).toBe(200);
    })
})