const db = require('../config/db');

const authorize = (allowedRoles) => {
    return async (req, res, next) => {
        const userId = req.headers['user-id'] || req.body.userId;

        if (!userId) return res.status(401).json({ error: "User ID required for authorization" });

        const { rows } = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
        const user = rows[0];

        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ error: "Access Denied: You don't have the required permissions." });
        }
        next();
    };
};

module.exports = authorize;