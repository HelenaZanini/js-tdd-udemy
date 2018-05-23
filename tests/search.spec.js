import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);
import { search, searchArtists, searchAlbuns, searchTracks, searchPlaylists } from '../src/main';

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;

  beforeEach( () => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise =  fetchedStub.returnsPromise();
  });

  afterEach( () => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL', () => {

      context('passing one type', () => {
        const artists = search('Liniker', 'artist');
        expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Liniker&type=artist');

        const albuns = search('Liniker', 'albuns');
        expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Liniker&type=albuns');
      });

      context('passing more than one type', () => {
        const albuns = search('Liniker', ['artist', 'albuns']);
        expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Liniker&type=artist,albuns');
      });

    });

    it('should return the JSON', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Liniker', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('SearchArtists', () => {

    it('should call fetch function', () => {
      const artists = search('Liniker');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL', () => {
      const artists = search('Liniker');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Liniker&type=artist');

      const artists2 = search('Elza Soares');
      expect(fetchedStub).to.have.been
       .calledWith('https://api.spotify.com/v1/search?q=Elza Soares&type=artist');
    });
  });

  describe('SearchAlbuns', () => {

    it('should call fetch function', () => {
      const Albuns = search('Liniker');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL', () => {
      const Albuns = search('Liniker');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Liniker&type=album');

      const Albuns2 = search('Elza Soares');
      expect(fetchedStub).to.have.been
       .calledWith('https://api.spotify.com/v1/search?q=Elza Soares&type=album');
    });
  });

  describe('SearchTracks', () => {

    it('should call fetch function', () => {
      const Tracks = search('Liniker');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL', () => {
      const Tracks = search('Liniker');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Liniker&type=track');

      const Tracks2 = search('Elza Soares');
      expect(fetchedStub).to.have.been
       .calledWith('https://api.spotify.com/v1/search?q=Elza Soares&type=track');
    });
  });

  describe('SearchPlaylist', () => {

    it('should call fetch function', () => {
      const Playlist = search('Liniker');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL', () => {
      const Playlist = search('Liniker');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Liniker&type=playlist');

      const Playlist2 = search('Elza Soares');
      expect(fetchedStub).to.have.been
       .calledWith('https://api.spotify.com/v1/search?q=Elza Soares&type=playlist');
    });
  });
});
