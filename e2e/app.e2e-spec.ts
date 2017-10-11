import { DarProjectPage } from './app.po';

describe('dar-project App', function() {
  let page: DarProjectPage;

  beforeEach(() => {
    page = new DarProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
