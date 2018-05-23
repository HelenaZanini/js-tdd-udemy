import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

import { getAlbum, getAlbums, getAlbumTracks } from '../src/albuns';

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
    it('should exist the getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should exist the getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('should exist the getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {

    it('should call fetch function', () => {
      const Tracks = getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL', () => {
      const Tracks = getAlbum();
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums//tracks');
    });

    it('should return the correct data from promise', () => {
      const Tracks = getAlbum();
      expect(Tracks.resolveValue).to.to.be.eql({ album: 'name'});
    });
  });

  describe('getAlbums', () => {

    it('should call fetch function', () => {
      const Tracks = getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL', () => {
      const Tracks = getAlbums();
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums//tracks');
    });

    it('should return the correct data from promise', () => {
      const Tracks = getAlbums();
      expect(Tracks.resolveValue).to.to.be.eql({ album: 'name'});
    });

  });

  describe('getAlbumTracks', () => {

    it('should call fetch function', () => {
      const Tracks = getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL', () => {
      const Tracks = getAlbumTracks();
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums//tracks');
    });

    it('should return the correct data from promise', () => {
      const Tracks = getAlbumTracks();
      expect(Tracks.resolveValue).to.be.eql({ album: 'name'});
    });

  });
});
