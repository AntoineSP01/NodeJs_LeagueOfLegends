import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

const getChampions = (req, res) => {
    prisma.champion
        .findMany()
        .then((champions) => {
            res.json(champions);
        })
        .catch((error) => {
            res.json(error);
        });
};

const getChampion = (req, res) => {
    let id = Number(req.params.id);

    prisma.champion
        .findUnique({
            where: {
                id: id,
            },
        })
        .then((champion) => {
            res.json(champion);
        })
        .catch((error) => {
            res.json(error);
        });
};

const createChampion = (req, res) => {
    let champion = req.body;
    prisma.champion
        .create({
            data: {
                name: champion.name,
                type: champion.type,
            },
        })
        .then((champion) => {
            res.json(champion);
        })
        .catch((error) => {
            res.json(error);
        });
};

const updateChampion = (req, res) => {
    let id = Number(req.params.id);
    let champion = req.body;

    prisma.champion
        .update({
            where: {
                id: id,
            },
            data: {
                name: champion.name,
                type: champion.type,
            },
        })
        .then((champion) => {
            res.json(champion);
        })
        .catch((error) => {
            res.json(error);
        });
};

const deleteChampion = (req, res) => {
    let id = Number(req.params.id);

    prisma.champion
        .delete({
            where: {
                id: id,
            },
        })
        .then((champion) => {
            res.json(champion);
        })
        .catch((error) => {
            res.json(error);
        });
};

const importChampion = async (req, res) => {
    try {
        const championsData = fs.readFileSync("./champions.json", "utf8");
        const champions = JSON.parse(championsData);
        console.log(champions);

        // Insérez chaque champion dans la base de données
        for (const champion of champions) {
            await prisma.champion.create({
                data: {
                    name: champion.name,
                    type: champion.type,
                },
            });
        }

        const message = "Champions importés avec succès";
        if (res) {
            res.json({ message });
        } else {
            console.log(message);
        }
        
    } catch (error) {
        console.error("Erreur lors de l'importation des champions:", error);
        res.status(500).json({ error: "Erreur du serveur interne" });
    }
};

export {
    getChampions,
    getChampion,
    createChampion,
    updateChampion,
    deleteChampion,
    importChampion,
};
