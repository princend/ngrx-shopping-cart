import * as fromReport from './report.actions';

describe('loadReports', () => {
  it('should return an action', () => {
    expect(fromReport.loadReports().type).toBe('[Report] Load Reports');
  });
});
