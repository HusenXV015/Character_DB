const { User, Character } = require('../models');

const authorization = async (req, res, next) => {
    try {
        const { userId, role } = req.loginInfo; 

        if (role === 'member') {
            const user = await User.findByPk(userId);
            if (!user) throw { name: "Forbidden" };

            const { id } = req.params;
            const characters = await Character.findByPk(id);
            if (!characters) throw { name: "NotFound" };
            if (characters.userId !== user.id) throw { name: "Forbidden" };
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authorization;
