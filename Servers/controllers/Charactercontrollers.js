const { User, Game, Character } = require('../models');
const cloudinary = require('../utils/cloudinary');

class Charactercontroller {
    static async read(req, res, next) {
        try {
            const characters = await Character.findAll({
                include: [
                    { model: User, attributes: ['username', 'email'] },
                    { model: Game, attributes: ['name'] }
                ],
                attributes: { exclude: ['User.password'] }
            });
            res.status(200).json({
                message: 'Success read Character',
                characters
            });
        } catch (err) {
            next(err);
        }
    }

    static async readById(req, res, next) {
        try {
            const { id } = req.params;
            const characters = await Character.findByPk(id, {
                include: [
                    { model: User, attributes: ['username', 'email'] },
                    { model: Game, attributes: ['name'] }
                ],
                attributes: { exclude: ['userId'] }
            });
            if (!characters) {
                return res.status(404).json({ message: 'Character not found' });
            }
            res.status(200).json({characters});
        } catch (err) {
            next(err);
        }
    }

    static async add(req, res, next) {
        try {
            const { userId } = req.loginInfo;
            const { name, gender, gameName, gameId, description, skill, weapon, imgUrl } = req.body;

            const character = await Character.create({
                name,
                gender,
                gameName,
                gameId,
                description,
                imgUrl,
                skill,
                weapon,
                userId: userId
            });
            res.status(201).json({
                message: "Success input Character",
                character
            });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
          const { name, gender, gameName, gameId, description, skill, weapon, imgUrl } = req.body;
          const { id } = req.params;
      
          const character = await Character.findByPk(id);
          if (!character) {
            return res.status(404).json({ message: 'Character not found.' });
          }
      
          character.name = name;
          character.gender = gender;
          character.gameName = gameName;
          character.gameId = gameId;
          character.description = description;
          character.imgUrl = imgUrl;
          character.skill = skill;
          character.weapon = weapon;
      
          await character.save(); 
      
          res.status(200).json({
            message: "Success edit Character",
            character
          });
        } catch (err) {
          next(err);
        }
      }
      

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const characters = await Character.findByPk(id);
            if (!characters) {
                return res.status(404).json({ message: 'Character not found.' });
            }
            await characters.destroy();
            res.status(200).json({ message: 'Successfully deleted.' });
        } catch (err) {
            next(err);
        }
    }
    static async updatePartial(req, res, next) {
        try {
            const { id } = req.params;
            const file = req.file;

            const characters = await Character.findByPk(id);
            if (!characters) {
                return res.status(404).json({ message: 'Character not found.' });
            }

            if (file) {
                const result = await cloudinary.uploader.upload(file.path);
                characters.imgUrl = result.secure_url;
            }

            const { name, gender, gameName, gameId, description, skill, weapon } = req.body;
            if (name) characters.name = name;
            if (gender) characters.gender = gender;
            if (gameName) characters.gameName = gameName;
            if (gameId) characters.gameId = gameId;
            if (description) characters.description = description;
            if (skill) characters.skill = skill;
            if (weapon) characters.weapon = weapon;

            await characters.save();

            res.status(200).json({
                message: "Success update Character",
                characters
            });
        } catch (err) {
            next(err);
        }
    }
    static async generateCharacterName(req, res, next) {
        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = "Please give me a unique fantasy character name";
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            const characterName = text.trim();

            res.status(200).json({
                message: "Generated Character Name",
                characterName
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}

module.exports = Charactercontroller;
