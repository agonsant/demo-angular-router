import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, switchMap, withLatestFrom, of } from 'rxjs';
import { Character, CharactersResponse } from '../models/characters.model';
import { EpisodeResponse } from '../models/episodes.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersApiService {

  constructor(private httpClient: HttpClient) {

  }


  private generateEpisodesRequest(characters: CharactersResponse) {
    return forkJoin(
      characters.results.map((c) => this.httpClient.get<EpisodeResponse>(c.episode[0]))
    )
  }

  private mergeEpisodesWithCharacters(characters: CharactersResponse, episodes: EpisodeResponse[]) {
    return episodes.map((e, i) => ({
      ...characters.results[i],
      firstSeen: e.name
    }))
  }

  private handleError(err: Error) {
    console.error(err)
    return of([]);
  }

  getCharacters(): Observable<Character[]> {
    const characters$ = this.httpClient.get<CharactersResponse>('https://rickandmortyapi.com/api/character')
    return characters$
      .pipe(
        switchMap(this.generateEpisodesRequest.bind(this)), // creates the array of observables for each character episode
        withLatestFrom(characters$), // combine de response of switchmap with the response of characters. needed for merging
        map(([episodes, characters]) => this.mergeEpisodesWithCharacters(characters, episodes)), // generates de final object
        catchError(this.handleError),
      );
  }
}
