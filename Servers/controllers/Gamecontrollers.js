const { Game } = require(`../models`);

class GameController {
    static async read(req, res, next) {
        try {
            const games = await Game.findAll();
            res.status(200).json({
                message: 'Success read games',
                games
            });
        } catch (err) {
            console.log(err);
            
            next(err);
        }
    }

    static async add(req, res, next) {
        try {
            const { name } = req.body;
            const game = await Game.create({ name });
            res.status(201).json({
                message: "Success create new game",
                game
            });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const game = await Game.findByPk(id);
            if (!game) {
                return res.status(404).json({ message: `Game with id ${id} not found` });
            }
            await game.destroy();
            res.status(200).json({
                message: `Success to delete game with id ${id}`
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = GameController;
