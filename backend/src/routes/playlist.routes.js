import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { 
    importSpotifyPlaylists,
    getUserPlaylists,
    getPlaylistById,
} from "../controllers/playlist.controller.js";

const router = Router();

router.get("/", verifyJWT, getUserPlaylists);

router.get("/:playlistId", verifyJWT, getPlaylistById);


router.post(
    "/spotify/import", 
    verifyJWT, 
    importSpotifyPlaylists
);

export default router;