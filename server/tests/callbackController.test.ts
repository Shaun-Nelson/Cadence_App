import { callback } from '../controllers/callbackController';
import { Request, Response } from 'express';
import spotifyWebApi from 'spotify-web-api-node';

jest.mock('spotify-web-api-node');
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

const getSpotifyTokens = jest.fn();
const setSpotifyTokens = jest.fn();

describe('callback', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockSpotifyApiInstance: any;

  beforeEach(() => {
    req = {
      query: {},
      session: {},
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      redirect: jest.fn(),
      cookie: jest.fn(),
    };
    mockSpotifyApiInstance = {
      authorizationCodeGrant: jest.fn(),
      setAccessToken: jest.fn(),
      setRefreshToken: jest.fn(),
    };

    (spotifyWebApi as jest.Mock).mockReturnValue(mockSpotifyApiInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if state does not match', async () => {
    req.query = { state: 'invalid_state' };
    req.session = { state: 'valid_state' };

    await callback(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'Invalid state' });
  });

  it('should return 400 if code is missing', async () => {
    req.query = { state: 'valid_state' };
    req.session = { state: 'valid_state' };

    await callback(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'Authorization code is missing' });
  });

  it('should return 500 if error occurs during token exchange', async () => {
    req.query = { state: 'valid_state', code: 'valid_code' };
    req.session = { state: 'valid_state' };
    mockSpotifyApiInstance.authorizationCodeGrant.mockRejectedValue(new Error('Token error'));

    await callback(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Invalid Spotify token' });
  });

  it('should return 500 if error occurs during session save', async () => {
    req.query = { state: 'valid_state', code: 'valid_code' };
    req.session = {
      state: 'valid_state',
      save: jest.fn((cb) => cb(new Error('Session save error'))),
    };
    mockSpotifyApiInstance.authorizationCodeGrant.mockResolvedValue({
      body: { access_token: 'access_token', refresh_token: 'refresh_token' },
    });

    await callback(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Session save error' });
  });

  it('should redirect to client URL on successful token exchange and session save', async () => {
    req.query = { state: 'valid_state', code: 'valid_code' };
    req.session = {
      state: 'valid_state',
      save: jest.fn((cb) => cb(null)),
    };
    mockSpotifyApiInstance.authorizationCodeGrant.mockResolvedValue({
      body: { access_token: 'access_token', refresh_token: 'refresh_token' },
    });

    await callback(req as Request, res as Response);

    expect(res.redirect).toHaveBeenCalledWith(process.env.CLIENT_URL);
  });
});
