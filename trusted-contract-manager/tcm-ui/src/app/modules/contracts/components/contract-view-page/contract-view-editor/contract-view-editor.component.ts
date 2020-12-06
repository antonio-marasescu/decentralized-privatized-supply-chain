import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-contract-view-editor',
  templateUrl: './contract-view-editor.component.html',
  styleUrls: ['./contract-view-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractViewEditorComponent implements AfterViewInit {
  @ViewChild('editorParentContainer', { static: true })
  editorParentContainer;
  quillEditorOptions = {
    height: '200px',
    width: '300px',
  };

  ngAfterViewInit(): void {
    this.quillEditorOptions.width = this.editorParentContainer.nativeElement.offsetWidth;
  }
}
