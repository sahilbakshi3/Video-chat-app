import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
    acceptFriendRequest,
    getMyFriends,
    getRecommendedUsers, 
    sendFriendRequest 
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.get("/friend-request/:id", sendFriendRequest);
router.get("/friend-request/:id/accept", acceptFriendRequest);


export default router;