import { Component, Input } from '@angular/core';
import { Character, createDefaultCharacter } from 'src/app/models/characters.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CharacterCardComponent {

  @Input() character: Character = createDefaultCharacter();

}
