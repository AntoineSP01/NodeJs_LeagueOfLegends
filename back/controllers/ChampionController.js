import { PrismaClient } from "@prisma/client";
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

const getChampion = (req, res) => {};

const createChampion = (req, res) => {
    let champion = req.body;
    console.log(champion);
    prisma.champion
        .create({
            data: {
                name: champion.name,
                type: champion.type
            },
        })
        .then((champion) => {
            res.json(champion);
        })
        .catch((error) => {
            res.json(error);
        });
};

const updateChampion = (req, res) => {};

const deleteChampion = (req, res) => {};

export {
    getChampions,
    getChampion,
    createChampion,
    updateChampion,
    deleteChampion,
};
