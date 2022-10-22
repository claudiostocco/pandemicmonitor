import { Router } from "express";
import { ObjectId } from "bson";

import { find } from '../../services/database/find';
import { insert, insertMany } from '../../services/database/insert';
import { update } from '../../services/database/update';
import { remove } from '../../services/database/delete';
import { CollectionPlace, CollectionPlaces } from "../../types/collectionPlaces";

export const collectionPlacesRouter = Router();

collectionPlacesRouter.get('/', async (req, res) => {
    const searched = await find('collectionPlaces', {});
    if (searched) {
        return res.status(searched.success ? 201 : 500).json(searched);
    }
    return res.status(500).json({
        success: false,
        searched: null,
        error: 'Collection places list shearching error',
    });
});

collectionPlacesRouter.get('/:id', async (req, res) => {
    if (req.params.id) {
        const searched = await find('collectionPlaces', { _id: new ObjectId(req.params.id) });
        return res.status(searched?.success ? 200 : 500).json(searched);
    }
    return res.status(200).json({
        success: false,
        searched: null,
        error: 'Invalid parameter request',
    });
});

collectionPlacesRouter.get('/address/:address', async (req, res) => {
    if (req.params.address) {
        const address = new RegExp(req.params.address, 'i');
        const searched = await find('collectionPlaces', { address });
        return res.status(searched?.success ? 200 : 500).json(searched);
    }
    return res.status(200).json({
        success: false,
        searched: null,
        error: 'Invalid parameter request',
    });
});

collectionPlacesRouter.get('/neighborhood/:neighborhood', async (req, res) => {
    if (req.params.neighborhood) {
        const neighborhood = new RegExp(req.params.neighborhood,'i');
        const searched = await find('collectionPlaces', { neighborhood });
        return res.status(searched?.success ? 200 : 500).json(searched);
    }
    return res.status(200).json({
        success: false,
        searched: null,
        error: 'Invalid parameter request',
    });
});

collectionPlacesRouter.post('/', async (req, res) => {
    if (req.body) {
        const collectionPlace = req.body as CollectionPlace;
        if ((collectionPlace) && collectionPlace.address && collectionPlace.neighborhood) {
            const inserted = await insert('collectionPlaces', {
                address: collectionPlace.address,
                neighborhood: collectionPlace.neighborhood
            }, collectionPlace);
            return res.status(inserted?.success ? 201 : 500).json(inserted);
        }
    }
    return res.status(400).json({
        success: false,
        inserted: null,
        error: 'Invalid request body',
    });
});

collectionPlacesRouter.post('/many', async (req, res) => {
    if (req.body) {
        const collectionPlaces = req.body as CollectionPlaces;
        if (collectionPlaces) {
            const inserted = await insertMany('collectionPlaces', collectionPlaces);
            return res.status(inserted?.success ? 201 : 500).json(inserted);
        }
    }
    return res.status(400).json({
        success: false,
        inserted: null,
        error: 'Invalid request body',
    });
});

collectionPlacesRouter.put('/:id', async (req, res) => {
    if ((req.params.id) && (req.body)) {
        const collectionPlace = req.body as CollectionPlace;
        if (collectionPlace) {
            const updated = await update('collectionPlaces', { _id: new ObjectId(req.params.id) }, collectionPlace);
            return res.status(updated?.success ? 200 : 500).json(updated);
        }
    }
    return res.status(400).json({
        success: false,
        updated: null,
        error: 'Invalid parameters or request body',
    });
});

collectionPlacesRouter.delete('/:id', async (req, res) => {
    if (req.params.id) {
        const deleted = await remove('collectionPlaces', { _id: new ObjectId(req.params.id) });
        return res.status(deleted?.success ? 200 : 500).json(deleted);
    }
    return res.status(400).json({
        success: false,
        updated: null,
        error: 'Invalid request parameters',
    });
});