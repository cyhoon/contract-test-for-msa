const pact = require('@pact-foundation/pact-node');
const path = require('path');

const pactBrokerUrl = 'YOUR_PACT_BROKER_URL';
const pactBrokerToken = 'YOUR_PACT_BROKER_TOKEN';

const gitHash = require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString().trim();

const opts = {
    pactFilesOrDirs: ['./pact/pacts/'],
    pactBroker: pactBrokerUrl,
    pactBrokerToken: pactBrokerToken,
    tags: ['prod', 'test'],
    consumerVersion: gitHash
};

pact
    .publishPacts(opts)
    .then(() => {
        console.log('Pact contract publishing complete!');
        console.log('');
        console.log(`Head over to ${pactBrokerUrl}`);
        console.log('to see your published contracts.')
    })
    .catch(e => {
        console.log('Pact contract publishing failed: ', e)
    });