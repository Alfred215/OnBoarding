import { TestBed } from '@angular/core/testing';

import { PostTypeGuard } from './post-type.guard';

describe('PostTypeGuard', () => {
  let guard: PostTypeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PostTypeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
