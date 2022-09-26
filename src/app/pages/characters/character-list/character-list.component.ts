import { Component } from '@angular/core';
import { CharactersApiService } from 'src/app/api/characters-api.service';
import { Character, Status } from 'src/app/models/characters.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {

  characters: Character[] = [];

  constructor(private charactersApi: CharactersApiService) {
    this.charactersApi.getCharacters().subscribe(c => this.characters=c);
  }

  killEveryone(){
    this.characters.forEach(c => c.status=Status.Dead);
  }

  reviveEveryone(){
    this.characters.forEach(c => c.status=Status.Alive);
  }

}
