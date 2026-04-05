const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const authorize = require('../middlewares/roleAuth');

// CREATE (Admin Only)
// Path: POST /api/records/add
router.post('/add', authorize(['ADMIN']), recordController.createRecord);

//ANALYTICS & REPORTS (Analyst and Admin)
// Path: GET /api/records/report/:userId
// Note: This MUST stay above the /:userId route
router.get('/report/:userId', authorize(['ANALYST', 'ADMIN']), recordController.getReport);

//READ HISTORY (Everyone)
// Path: GET /api/records/:userId
router.get('/:userId', recordController.getUserRecords);

//UPDATE (Admin Only)
// Path: PUT /api/records/:id
router.put('/:id', authorize(['ADMIN']), recordController.updateExistingRecord);

//DELETE (Admin Only)
// Path: DELETE /api/records/:id
router.delete('/:id', authorize(['ADMIN']), recordController.removeRecord);

module.exports = router;