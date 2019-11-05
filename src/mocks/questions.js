import {shape, string, oneOf, arrayOf, number} from 'prop-types';

export const questionType = shape({
  type: oneOf([`genre`, `artist`]).isRequired,
  genrge: oneOf([`rock`, `folk`, `jazz`, `pop`]),
  song: shape({
    src: string,
    artist: string
  }),
  answers: arrayOf(
      shape({
        id: number,
        src: string.isRequired,
        genrge: oneOf([`rock`, `folk`, `jazz`, `pop`]).isRequired
      })) |
    shape({
      id: number,
      picture: string.isRequired,
      artist: string.isRequired
    }).isRequired
});

export const settings = {
  gameTime: 5,
  errorCount: 3,
};

export const gameQuestions = [
  {
    type: `genre`,
    genre: `Hip Hop & Rap`,
    answers: [
      {
        id: 100,
        src: `https://www.youtube.com/audiolibrary_download?vid=3b32fa1674bc3764`,
        genre: `Hip Hop & Rap`,
      },
      {
        id: 101,
        src: `https://www.youtube.com/audiolibrary_download?vid=28782f0fee64fd45`,
        genre: `Dance & Electronic`,
      },
      {
        id: 102,
        src: `https://www.youtube.com/audiolibrary_download?vid=1b61f851e58e6ffe`,
        genre: `pop`,
      },
      {
        id: 103,
        src: `https://www.youtube.com/audiolibrary_download?vid=ad2e6ac237dfb8ba`,
        genre: `Dance & Electronic`,
      },
    ],
  },
  {
    type: `genre`,
    genre: `Pop`,
    answers: [
      {
        id: 104,
        src: `https://www.youtube.com/audiolibrary_download?vid=1b61f851e58e6ffe`,
        genre: `Pop`,
      },
      {
        id: 105,
        src: `https://www.youtube.com/audiolibrary_download?vid=ad2e6ac237dfb8ba`,
        genre: `Dance & Electronic`,
      },
      {
        id: 106,
        src: `https://www.youtube.com/audiolibrary_download?vid=47be4e2187adf0c5`,
        genre: `Dance & Electronic`,
      },
      {
        id: 107,
        src: `https://www.youtube.com/audiolibrary_download?vid=fdce0df3f10e0a6f`,
        genre: `Ambient`,
      },
    ],
  },
  {
    type: `artist`,
    song: {
      artist: `Bad Snacks`,
      src: `https://www.youtube.com/audiolibrary_download?vid=47be4e2187adf0c5`,
    },
    answers: [
      {
        id: 200,
        picture: `http://placehold.it/134x134`,
        artist: `Bad Snacks`,
      },
      {
        id: 201,
        picture: `http://placehold.it/134x134`,
        artist: `Jack Daniels`,
      },
      {
        id: 202,
        picture: `http://placehold.it/134x134`,
        artist: `Jim Beam`,
      },
    ],
  },
  {
    type: `artist`,
    song: {
      artist: `Jeremy Blake`,
      src: `https://www.youtube.com/audiolibrary_download?vid=3b32fa1674bc3764`,
    },
    answers: [
      {
        id: 203,
        picture: `http://placehold.it/134x134`,
        artist: `Jeremy Blake`,
      },
      {
        id: 204,
        picture: `http://placehold.it/134x134`,
        artist: `Jack Daniels`,
      },
      {
        id: 205,
        picture: `http://placehold.it/134x134`,
        artist: `Jim Beam`,
      },
    ],
  },
];

export const songs = [
  {
    "title": `U In My Arms`,
    "download_url": `https://www.youtube.com/audiolibrary_download?vid=3b32fa1674bc3764`,
    "artist": `Jeremy Blake`,
    "genre": `Hip Hop & Rap`,
  },
  {
    "title": `Through The Crystal`,
    "download_url": `https://www.youtube.com/audiolibrary_download?vid=28782f0fee64fd45`,
    "artist": `Jeremy Blake`,
    "genre": `Dance & Electronic`,
  },
  {
    "title": `Everything Is Gonna Be Just Fine`,
    "download_url": `https://www.youtube.com/audiolibrary_download?vid=1b61f851e58e6ffe`,
    "artist": `Jeremy Blake`,
    "genre": `Pop`,
  },
  {
    "title": `Block Party`,
    "download_url": `https://www.youtube.com/audiolibrary_download?vid=ad2e6ac237dfb8ba`,
    "artist": `Bad Snacks`,
    "genre": `Dance & Electronic`,
  },
  {
    "title": `New Moon`,
    "download_url": `https://www.youtube.com/audiolibrary_download?vid=47be4e2187adf0c5`,
    "artist": `Bad Snacks`,
    "genre": `Dance & Electronic`,
  },
  {
    "title": `They Might Not`,
    "download_url": `https://www.youtube.com/audiolibrary_download?vid=fdce0df3f10e0a6f`,
    "artist": `Puddle of Infinity`,
    "genre": `Ambient`,
  }
];
