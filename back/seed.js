// Import des dépendances nécessaires
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { importChampion } from "./controllers/ChampionController.js"

const prisma = new PrismaClient();

const seed = async () => {
    try {
        await importChampion(null, null); 
    } catch (error) {
        console.error("Erreur lors du seeding :", error);
        process.exit(1); 
    }
};

seed();
