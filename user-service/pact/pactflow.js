const pact = require('@pact-foundation/pact-node');

const pactBrokerUrl = 'https://web.pactflow.io';
const pactBrokerToken = 'J84BANOWsPbcXd6btbYJzA';

const gitHash = require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString().trim();

const opts = {
    pactFilesOrDirs: ['./pacts/'],
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
        console.log('Pact contract publishing failed: ', e);
    });