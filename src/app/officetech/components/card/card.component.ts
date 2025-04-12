import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {PanelItemsService} from "../../services/panel/panel-items.service";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions, MatCardTitle, MatCardSubtitle, NgForOf
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() data: any[] = []

  constructor(private panelService: PanelItemsService) {
  }

  cancelService(id: number) {
    this.panelService.editStatusService(id, "Cancelled").subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )

    // reload the page
    location.reload()
  }
}
