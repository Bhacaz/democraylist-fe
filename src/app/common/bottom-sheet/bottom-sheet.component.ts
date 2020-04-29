import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {SlideUpToggleAnimation} from './utility/bottom-sheet.animation';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  animations: [SlideUpToggleAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomSheetComponent implements OnInit {

  flags: any = {
    isBottomSheetEnabled: false
  };
  @Input() title: string;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {

  }

  /**
   * Opens bottom sheet component
   */
  open() {
    this.flags.isBottomSheetEnabled = true;
    this.changeDetector.detectChanges();
  }

  /**
   * Closes bottom sheet component
   */
  close() {
    this.flags.isBottomSheetEnabled = false;
    this.changeDetector.detectChanges();
  }

  /**
   * Toggles bottom sheet component
   */
  toggle() {
    this.flags.isBottomSheetEnabled = !this.flags.isBottomSheetEnabled;
    this.changeDetector.detectChanges();
  }
}
