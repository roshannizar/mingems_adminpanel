import { TestBed } from '@angular/core/testing';

import { DeliveryChargeService } from './delivery-charge.service';

describe('DeliveryChargeService', () => {
  let service: DeliveryChargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryChargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
