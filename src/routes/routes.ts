import { Router } from 'express';

import { loginRouter } from './login';
import { usersRouter } from './users';
import { collectionPlacesRouter } from './collectionPlaces';
import { complaintsRouter } from './complaints';

export const routes = Router();

routes.get('/', (req, res) => {
    return res.sendFile(__dirname+'/static/index.html');
});

routes.get('/version', (req, res) => res.json({version: '1.0.0'}));

routes.use('/login', loginRouter);
routes.use('/users', usersRouter);
routes.use('/collectionPlaces', collectionPlacesRouter);
routes.use('/complaints', complaintsRouter);