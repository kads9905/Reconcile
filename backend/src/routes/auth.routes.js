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
    // verifyJWT,  -> removed cuz the callback comes from spotify not from logged in reconcile session
    spotifyCallback
);

export default router;