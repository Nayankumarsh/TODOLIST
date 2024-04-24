
const User = require("../models/user");
const List = require("../models/list");

//create
exports.addTask = async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//update
exports.updateTask = async (req, res) => {
  try {
    const { title, body } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body });
    list.save().then(() => res.status(200).json({ message: "Task Updated" }));
  } catch (error) {
    console.log(error);
  }
};

//delete
exports.deleteTask = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const existingUser = await User.findOneAndUpdate({ email: email }, {
      $pull: { list: req.params.id },
    });

    if (existingUser) {
      // If the user exists, delete the task
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Task Deleted" });
    } else {
      // If the user doesn't exist or there's an error, send an appropriate response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//getTska
exports.getTasks = async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    if (list.length !== 0) {
      res.status(200).json({ list: list });
    } else {
      // If no tasks are found for the user, send a 404 response
      res.status(404).json({ message: "No tasks found for the user" });
    }
  } catch (error) {
    console.log(error);
    // If an error occurs during the database operation, send a 500 response
    res.status(500).json({ message: "Internal Server Error" });
  }
};


