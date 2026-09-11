import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { ConnectedAccount } from "../models/connectedAccount.model.js";
import { Playlist } from "../models/playlist.model.js";

import { 
    getCurrentUserPlaylists,
    refreshSpotifyAccessToken,
} from "../services/spotify.service.js";

const importSpotifyPlaylists = asyncHandler(async (req, res) => {4
    // find connected spotify account
  const connectedAccount = await ConnectedAccount.findOne({
    user: req.user._id,
    provider: "spotify",
  });

  if (!connectedAccount) {
    throw new ApiError(404, "Spotify account not connected");
  }
  
  // detect expiry of accesstoken and refresh automatically
  if (connectedAccount.expiresAt < new Date()) {
    const refreshed = await refreshSpotifyAccessToken(
        connectedAccount.refreshToken
    );

    connectedAccount.accessToken = refreshed.access_token;

    connectedAccount.expiresAt = new Date(
      Date.now() + refreshed.expires_in * 1000
    );

    await connectedAccount.save();
  }

  //fetch raw playlists from spotify
  const spotifyData = await getCurrentUserPlaylists(
    connectedAccount.accessToken
  );

  //transform spotify + reconcile schema
  console.log(JSON.stringify(spotifyData.items[0], null, 2));

  const playlists = spotifyData.items.map((playlist) => ({
    user: req.user._id,
    provider: "spotify",

    // permanent identifier
    providerPlaylistId: playlist.id,

    // display data
    title: playlist.name,
    description: playlist.description || "",
    coverImage: playlist.images?.[0]?.url || "",
    trackCount: playlist.items?.total || 0,
  }));

  //sync/save into mongodb
  await Playlist.bulkWrite(
    playlists.map((playlist) => ({
        updateOne: {
            filter: {
                providerPlaylistId: playlist.providerPlaylistId,
                provider: "spotify",
            },
            update: {
                $set: playlist,
            },
            upsert: true,
        },
    }))
    );

    //return playlists from db
    const importedPlaylists = await Playlist.find({
        user: req.user._id,
        provider: "spotify",
    }).sort({ createdAt: 1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            importedPlaylists,
            "Spotify playlists imported successfully"
        )
    )

});


export {
    importSpotifyPlaylists,
}