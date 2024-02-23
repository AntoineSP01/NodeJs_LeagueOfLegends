import express from "express";
import {
    getChampions,
    getChampion,
    createChampion,
    updateChampion,
    deleteChampion,
    importChampion,
} from "../controllers/ChampionController.js";

const router = express.Router();

router.get("/", getChampions);
router.get("/:id", getChampion);
router.post("/", createChampion);
router.put("/:id", updateChampion);
router.delete("/:id", deleteChampion);
router.post("/importChampion", importChampion);

export default router;
