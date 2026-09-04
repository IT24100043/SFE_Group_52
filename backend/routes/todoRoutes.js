const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoControllers');

// 01. Add Todo (Passes UserId in Param)
router.post('/add/:UserId', todoController.add_todo);

// 02. Update Todo
router.put('/update/:id', todoController.Update_todo);

// 03. Delete Todo
router.delete('/delete/:id', todoController.delete_todo);

// 04. Get All Todos for a User
router.get('/all/:UserId', todoController.all_todo);

// 05. Get High Priority Todos for a User
router.get('/high/:UserId', todoController.get_high_priority);

// 06. Get Medium Priority Todos for a User
router.get('/medium/:UserId', todoController.get_medium_priority);

// 07. Get Low Priority Todos for a User
router.get('/low/:UserId', todoController.get_low_priority);

module.exports = router;