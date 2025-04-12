import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-monkey-not-found',
  standalone: true,
  imports: [],
  templateUrl: './monkey-not-found.component.html',
  styleUrl: './monkey-not-found.component.css'
})
export class MonkeyNotFoundComponent {
  @Input() textString: string = "There is nothing to show here...";
}
