import { Router } from "express";

import { find } from "../../services/database/find";
import { User } from "../../types/users";

export const loginRouter = Router();

loginRouter.get('/', (req, res) => {
    return res.status(400).json({
        error: 'Informe usuário (email) e senha para login!',
    });
});

loginRouter.get('/:email/:password', async (req, res) => {
    if ((req.params.email) && (req.params.password)) {
        const searched = await find('users', { email: req.params.email });
        if (searched && searched.success && searched.searched && (searched.searched.length > 0)) {
            const user = searched.searched[0] as User;
            if (user.password === req.params.password) {
                return res.status(200).json({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                });
            };
        };
    };
    return res.status(401).json({
        message: 'Usuário ou senha inválidos!',
    });
});