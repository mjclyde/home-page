import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  public labels = [
    { complete: 'Developer', current$: new BehaviorSubject<string>('') },
    { complete: 'Entrepreneur', current$: new BehaviorSubject<string>('') },
    { complete: 'Sandwich Artist', current$: new BehaviorSubject<string>('') },
    { complete: 'Zelda Enthusiast', current$: new BehaviorSubject<string>('') },
  ];
  public typingLabel$ = new BehaviorSubject<number>(-1);

  private timer;

  public async ngOnInit() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.labels.length; i++) {
      this.typingLabel$.next(i);
      await this.typeLabel(this.labels[i]);
    }
  }

  public ngOnDestroy() {
    clearTimeout(this.timer);
  }

  private typeLabel(label: { complete: string, current$: BehaviorSubject<string> }) {
    return new Promise((resolve) => {
      if (label.current$.value === label.complete) {
        setTimeout(() => resolve(), _.random(400, 800));
      } else if (label.current$.value === '') {
        setTimeout(() => {
          label.current$.next(label.complete.substring(0, label.current$.value.length + 1));
          setTimeout(() => this.typeLabel(label).then(() => resolve()), _.random(40, 80));
        }, _.random(400, 1400));
      } else {
        label.current$.next(label.complete.substring(0, label.current$.value.length + 1));
        setTimeout(() => this.typeLabel(label).then(() => resolve()), _.random(40, 80));
      }
    });
  }

}
