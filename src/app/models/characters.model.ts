export type CharactersResponse = {
    info: Info;
    results: CharacterResponse[];
}

export type Info = {
    count: number;
    next: string;
    pages: number;
    prev: null;
}

export type CharacterResponse = {
    created: Date;
    episode: string[];
    gender: Gender;
    id: number;
    image: string;
    location: Location;
    name: string;
    origin: Location;
    species: Species;
    status: Status;
    type: string;
    url: string;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
    Unknown = "unknown",
}

export type Location = {
    name: string;
    url: string;
}

export enum Species {
    Alien = "Alien",
    Human = "Human",
}

export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}


export type Character = Omit<CharacterResponse, 'episode'> & {
    firstSeen: string;
}


const DEFAULT_CHARACTER: Character = {
    id: 0,
    name: '',
    url: '',
    type: '',
    status: Status.Unknown,
    species: Species.Alien,
    origin: {
        name: '',
        url: ''
    },
    location: {
        name: '',
        url: ''
    },
    firstSeen: '',
    created: new Date(),
    image: '',
    gender: Gender.Unknown
}

export const createDefaultCharacter = (): Character => ({...DEFAULT_CHARACTER});


