import { TestBed } from '@angular/core/testing';

import { ApiHeaderKubInterceptor } from './api-header-kub.interceptor';

describe('ApiHeaderKubInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiHeaderKubInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiHeaderKubInterceptor = TestBed.inject(ApiHeaderKubInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
