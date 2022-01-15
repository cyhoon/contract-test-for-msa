import { Verifier } from "@pact-foundation/pact";

describe('Pact Verification', () => {
  it('should validate the expectations of the order service', async () => {
    const opts = {
      providerBaseUrl: 'http://localhost:3000',
      provider: 'OrderService',
      providerVersion: '1.0.0',
      pactBrokerUrl: 'YOUR_PACT_BROKER_URL',
      pactBrokerToken: 'YOUR_PACT_BROKER_TOKEN',
      publishVerificationResult: true,
    }

    return new Verifier(opts).verifyProvider(opts).then(output => {
      console.log(output);
    });
  });
});
