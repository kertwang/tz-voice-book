import { describe } from 'mocha';
import { LogType } from '../types_rn/LogTypes';
import { log } from './Log';


describe('Utils Tests', function () {
  it('logs correctly', () => {

    log({
      type: LogType.DIALOG_FLOW_INTENT,
      intent: 'menu.call.mobile.formal',
      sessionId: "12345",
    });
  });
});