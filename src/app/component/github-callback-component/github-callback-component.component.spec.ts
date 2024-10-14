import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubCallbackComponentComponent } from './github-callback-component.component';

describe('GithubCallbackComponentComponent', () => {
  let component: GithubCallbackComponentComponent;
  let fixture: ComponentFixture<GithubCallbackComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubCallbackComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubCallbackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
