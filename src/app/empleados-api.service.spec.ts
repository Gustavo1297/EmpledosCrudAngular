import { TestBed } from '@angular/core/testing';

import { EmpleadosApiService } from './empleados-api.service';

describe('EmpleadosApiService', () => {
  let service: EmpleadosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
