import { TestBed } from '@angular/core/testing';

import { RetrievalService } from './retrieval.service';

describe('RetrievalService', () => {
  let service: RetrievalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrievalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
