

describe('SheetsApi' function() {

  it.only('loads the service api correctly', async () => {
    const result = await getSheetsApi('tz-phone-book-dev', '1HHmGvys_V6aowcv0mWeLpVsqa4GOENLm9aI2h2Du5OY');
    
    console.log('result is:', result);
  });
});