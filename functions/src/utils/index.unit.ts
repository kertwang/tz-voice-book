import  {describe} from 'mocha';
import * as assert from 'assert';
import { formatMobile } from '.';


describe('Utils Tests', function() {

  describe("buildRedirectUrl()", function () {

  });
  
  describe('formatMobile()', function() {
    it('Doesn\'t format an existing international number', () => {
      //Arrange
      const unformatted = "+639566512295";
      const country = "TZ";

      //Act
      const formatted = formatMobile(unformatted, country);

      //Assert
      assert.equal(unformatted, formatted);
    });

    it('Formats a local number correctly', () => {
      //Arrange
      const unformatted = "9566512295";
      const country = "TZ";

      //Act
      const formatted = formatMobile(unformatted, country);

      //Assert
      assert.equal('+2559566512295', formatted);
    });
    
    it('Formats an international number without + correctly', () => {
      //Arrange
      const unformatted = "16501111234";
      const country = "TZ";

      //Act
      const formatted = formatMobile(unformatted, country);

      //Assert
      assert.equal('+25516501111234', formatted);
    });

  });
});