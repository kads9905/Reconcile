import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { importSpotifyPlaylists } from "../controllers/playlist.controller.js";

const router = Router();

router.post(
    "/spotify/import", 
    verifyJWT, 
    importSpotifyPlaylists
);

export default router;