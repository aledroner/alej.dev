import { fromEvent, Observable, Subscription } from 'rxjs'
import { auditTime, map, tap } from 'rxjs/operators'

import { isPlatformBrowser } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'ale-progress-bar',
  template: `<div id="progress-bar"></div>`,
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit, OnDestroy {

  docElement: HTMLElement
  progressBar: HTMLElement
  docHeight: number

  scroll$: Observable<Event | number>
  scrollProgress$: Observable<number>
  scrollProgressSubscription: Subscription

  @Output() scrolled: EventEmitter<boolean> = new EventEmitter<boolean>()
  routerSubscription: Subscription

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      this.docElement = document.documentElement
      this.progressBar = document.getElementById('progress-bar')

      this.scroll$ = fromEvent(document, 'scroll').pipe(
        auditTime(50),
        map(() => this.docElement.scrollTop),
        tap((scrollTop) => this.scrolled.emit(scrollTop > 100 ? true : false))
      )

      this.scrollProgress$ = this.scroll$.pipe(
        map((evt: number) => {
          const docHeight = this.docElement.scrollHeight - this.docElement.clientHeight
          return (evt / docHeight) * 100
        })
      )

      this.scrollProgressSubscription = this.scrollProgress$.subscribe(this.updateProgressBar)

      // Reset ProgressBar when route changes
      this.routerSubscription = this.router.events.subscribe((route) => {
        if (route instanceof NavigationEnd) {
          this.updateProgressBar(0)
        }
      })
    }
  }

  updateProgressBar = (percentage: number): void => {
    this.progressBar.style.width = `${percentage}%`
  }

  ngOnDestroy(): void {
    if (this.scrollProgressSubscription) {
      this.scrollProgressSubscription.unsubscribe()
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe()
    }
  }
}
