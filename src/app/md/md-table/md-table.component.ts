import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

export interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-md-table',
  templateUrl: './md-table.component.html',
  styleUrls: ['./md-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdTableComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public cardClass: string;

  @Input()
  public data: TableData;

  constructor() { }

  ngOnInit() {
  }

}
