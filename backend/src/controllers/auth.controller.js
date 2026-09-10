import { 
    exchangeCodeForTokens, 
    generateSpotifyAuthURL, 
    getSpotifyProfile
} from "../services/spotify.service.js";

import { ConnectedAccount } from "../models/connectedAccount.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";


const connectSpotify = (req, res) => {
  const url = generateSpotifyAuthURL(req.user._id.toString());

  return res.redirect(url);
};

const spotifyCallback = asyncHandler (async (req, res) => {
    const { code, state } = req.query;   
    // 1. Exchange code for spotify tokens
    const tokens = await exchangeCodeForTokens(code);
    
    // 2. fetch spotify user's profile
    const spotifyUser = await getSpotifyProfile(tokens.access_token);

  // 3. save or update the connected account
    const connectedAccount = await ConnectedAccount.findOneAndUpdate(
        {
            user: state,
            provider: "spotify",
        },
        {
            providerUserId: spotifyUser.id,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        },
        {
            new: true,
            upsert: true,
        }
    );

    return res
    .status(200)
    .json({
        success: true,
        message: "Spotify connected successfully",
        data: {
            _id: connectedAccount._id,
            provider: connectedAccount.provider,
            providerUserId: connectedAccount.providerUserId,
            user: connectedAccount.user,
            expiresAt: connectedAccount.expiresAt,
            createdAt: connectedAccount.createdAt,
            updatedAt: connectedAccount.updatedAt,
        },
    });
});

export { connectSpotify, spotifyCallback };