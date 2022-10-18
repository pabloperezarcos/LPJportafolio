import { TestBed } from '@angular/core/testing';

import { FeriadosService } from './feriados.service';

describe('FeriadosService', () => {
  let service: FeriadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeriadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
