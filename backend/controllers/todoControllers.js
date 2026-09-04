const Todo = require('../models/todo');

// 01. Add Todo //
//--------------//
exports.add_todo = async (req, res) => {
    try {
        const { UserId } = req.params;
        const { Topic, Description, End_Date, Priority, Done } = req.body;

        if (!UserId) {
            return res.status(400).json({
                message: "UserId is required in URL params"
            });
        }

        if (!Topic || !Description || !End_Date || !Priority) {
            return res.status(400).json({
                message: "Please fill in all required fields (Topic, Description, End_Date, Priority)"
            });
        }

        const newTodo = new Todo({
            UserId,
            Topic,
            Description,
            End_Date,
            Priority,
            Done: Done !== undefined ? Done : false
            // Start_Date is automatically set by default in schema (Date.now)
        });

        await newTodo.save();

        res.status(201).json({
            message: "Todo created successfully",
            newTodo
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// 02. Update Todo //
//-----------------//
exports.Update_todo = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json({
            message: "Todo updated successfully",
            updatedTodo
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// 03. Delete Todo //
//-----------------//
exports.delete_todo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json({
            message: "Todo deleted successfully",
            deletedTodo
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// 04. Get All Todos //
//-------------------//
exports.all_todo = async (req, res) => {
    try {
        const { UserId } = req.params;

        if (!UserId) {
            return res.status(400).json({
                message: "UserId is required in URL params"
            });
        }

        const todos = await Todo.find({ UserId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// 05. Get High Priority Todos //
//-----------------------------//
exports.get_high_priority = async (req, res) => {
    try {
        const { UserId } = req.params;

        if (!UserId) {
            return res.status(400).json({
                message: "UserId is required in URL params"
            });
        }

        const highPriorityTodos = await Todo.find({ UserId, Priority: "High" });
        res.status(200).json(highPriorityTodos);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// 06. Get Medium Priority Todos //
//-------------------------------//
exports.get_medium_priority = async (req, res) => {
    try {
        const { UserId } = req.params;

        if (!UserId) {
            return res.status(400).json({
                message: "UserId is required in URL params"
            });
        }

        const mediumPriorityTodos = await Todo.find({ UserId, Priority: "Medium" });
        res.status(200).json(mediumPriorityTodos);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// 07. Get Low Priority Todos //
//----------------------------//
exports.get_low_priority = async (req, res) => {
    try {
        const UserId = req.params.UserId || req.params.userId;

        if (!UserId) {
            return res.status(400).json({
                message: "UserId is required in URL params"
            });
        }

        const lowPriorityTodos = await Todo.find({ UserId, Priority: "Low" });
        res.status(200).json(lowPriorityTodos);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};
