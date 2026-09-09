import { Router } from "express";
import {
  connectSpotify,
  spotifyCallback,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get( 
    "/spotify",
    verifyJWT,
    connectSpotify,
);

router.get(
    "/spotify/callback",
    verifyJWT,
    spotifyCallback
);

export default router;