import { toJSON } from './utils';
import { API_URL } from './config';

export const search = (query, type) =>
  fetch(`${API_URL}/search?q=${query}&type=${type}`).then(toJSON);

export const searchArtists = (query) => search(query, 'artist');

export const searchAlbuns = (query) => search(query, 'album');

export const searchTracks = (query) => search(query, 'track');

export const searchPlaylists = (query) => search(query, 'playlist');
