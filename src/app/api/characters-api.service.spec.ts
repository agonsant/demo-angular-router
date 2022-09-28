import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharactersApiService } from './characters-api.service';

describe('CharactersApiService', () => {
  let service: CharactersApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CharactersApiService);
    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  }); // test()

  it('When retrieve characters to API, it should return the character list with the first episode name', done =>  {
    const testCharacters = {
      "info": {
        "count": 826,
        "pages": 42,
        "next": "https://rickandmortyapi.com/api/character/?page=2",
        "prev": null
      },
      "results": [
        {
          "id": 1,
          "name": "Rick Sanchez",
          "status": "Alive",
          "species": "Human",
          "type": "",
          "gender": "Male",
          "origin": {
            "name": "Earth",
            "url": "https://rickandmortyapi.com/api/location/1"
          },
          "location": {
            "name": "Earth",
            "url": "https://rickandmortyapi.com/api/location/20"
          },
          "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          "episode": [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
            // ...
          ],
          "url": "https://rickandmortyapi.com/api/character/1",
          "created": "2017-11-04T18:48:46.250Z"
        },
        // ...
      ]
    }

    const testEpisode = {
      "id": 28,
      "name": "The Ricklantis Mixup",
      "air_date": "September 10, 2017",
      "episode": "S03E07",
      "characters": [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
        // ...
      ],
      "url": "https://rickandmortyapi.com/api/episode/28",
      "created": "2017-11-10T12:56:36.618Z"
    }
    service.getCharacters().subscribe({
      next: characters => {
        expect(characters.length).toBe(1);
        expect(characters[0].firstSeen).toBe("The Ricklantis Mixup")
        done()
      },
      error: done.fail
    });
    
    const req_char = httpTestingController.match('https://rickandmortyapi.com/api/character');
    req_char.forEach(r => r.flush(testCharacters));
    
    const req_episodes = httpTestingController.expectOne('https://rickandmortyapi.com/api/episode/1');
    expect(req_episodes.request.method).toEqual('GET');
    req_episodes.flush(testEpisode);
    httpTestingController.verify();
  });

  it('When retrieve characters to API failed, it should return an empty list of characters', done =>  {
    service.getCharacters().subscribe({
      next: characters => {
        expect(characters.length).toBe(0);
        done();
      },
      error: done.fail
    })

    const req = httpTestingController.match('https://rickandmortyapi.com/api/character');
    // Respond with mock error
    req[0].flush('Character Fail', { status: 500, statusText: 'Not Found' });    
  });
});
