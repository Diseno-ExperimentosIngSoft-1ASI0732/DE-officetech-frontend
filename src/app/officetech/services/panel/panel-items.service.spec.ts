import { TestBed } from '@angular/core/testing';

import { PanelItemsService } from './panel-items.service';

describe('PanelItemsService', () => {
  let service: PanelItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
