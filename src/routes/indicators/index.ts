import { Router } from "express";
import { ObjectId } from "bson";

import { find } from '../../services/database/find';
import { insert, insertMany } from '../../services/database/insert';
import { update } from '../../services/database/update';
import { remove } from '../../services/database/delete';
import { Indicator, Indicators } from "../../types/indicators";

export const indicatorsRouter = Router();

indicatorsRouter.get('/', async (req, res) => {
    const searched = await find('indicators', {});
    if (searched) {
        return res.status(searched.success ? 201 : 500).json(searched);
    }
    return res.status(500).json({
        success: false,
        searched: null,
        error: 'Indicators list shearching error',
    });
});

indicatorsRouter.get('date/:date', async (req, res) => {
    if (req.params.date) {
        const searched = await find('indicators', { _id: new ObjectId(req.params.date) });
        return res.status(searched?.success ? 200 : 500).json(searched);
    }
    return res.status(200).json({
        success: false,
        searched: null,
        error: 'Invalid parameter request',
    });
});

indicatorsRouter.get('/total/:date', async (req, res) => {
    if (req.params.date) {
        const date = new RegExp(req.params.date, 'i');
        const searched = await find('indicators', { date });
        return res.status(searched?.success ? 200 : 500).json(searched);
    }
    return res.status(200).json({
        success: false,
        searched: null,
        error: 'Invalid parameter request',
    });
});

indicatorsRouter.get('/total', async (req, res) => {
    const searched = await find('indicators', {});
    return res.status(searched?.success ? 200 : 500).json(searched);
});

indicatorsRouter.post('/', async (req, res) => {
    if (req.body) {
        const indicator = req.body as Indicator;
        if ((indicator) && indicator.date && indicator.contaminated && indicator.cured && indicator.deaths) {
            const inserted = await insert('indicators', {
                date: indicator.date
            }, indicator);
            return res.status(inserted?.success ? 201 : 500).json(inserted);
        }
    }
    return res.status(400).json({
        success: false,
        inserted: null,
        error: 'Invalid request body',
    });
});

indicatorsRouter.post('/many', async (req, res) => {
    if (req.body) {
        const indicators = req.body as Indicators;
        if (indicators) {
            const inserted = await insertMany('indicators', indicators);
            return res.status(inserted?.success ? 201 : 500).json(inserted);
        }
    }
    return res.status(400).json({
        success: false,
        inserted: null,
        error: 'Invalid request body',
    });
});

indicatorsRouter.put('/:id', async (req, res) => {
    if ((req.params.id) && (req.body)) {
        const indicator = req.body as Indicator;
        if (indicator) {
            const updated = await update('indicators', { _id: new ObjectId(req.params.id) }, indicator);
            return res.status(updated?.success ? 200 : 500).json(updated);
        }
    }
    return res.status(400).json({
        success: false,
        updated: null,
        error: 'Invalid parameters or request body',
    });
});

indicatorsRouter.delete('/:id', async (req, res) => {
    if (req.params.id) {
        const deleted = await remove('indicators', { _id: new ObjectId(req.params.id) });
        return res.status(deleted?.success ? 200 : 500).json(deleted);
    }
    return res.status(400).json({
        success: false,
        updated: null,
        error: 'Invalid request parameters',
    });
});