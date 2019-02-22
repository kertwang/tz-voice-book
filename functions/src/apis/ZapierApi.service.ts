import ZapierApi from "./ZapierApi";


describe('ZapierApi Service', function() {
  it('Send a number to the opt out zap', async () => {
    //Arrange
    const mobile = "12345";
    
    //Act
    await ZapierApi.optOut(mobile);

    //Assert
    //Don't need a response, if it doesn't throw then ok.
  });
});