import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent implements OnInit {
  @Input() item: string | undefined; //input decorator used so as to get item from parent to child
  @Output() onCancel = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  cancel() {
    this.onCancel.emit();
  }
}
