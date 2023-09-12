const Person = require("../models/Person");
const { isString, isValidId } = require("../utils/validate");

const addUser = async (req, res) => {
  const { name, hobbies, about } = req.body;
  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }
  if (!isString(name)) {
    return res
      .status(400)
      .json({ message: "all feilds are expected to be string." });
  }
  const duplicate = await Person.findOne({ name });
  if (duplicate) {
    return res.status(409).json({ message: "name already taken" });
  }

  try {
    if (hobbies) {
      if (!isString(hobbies)) {
        return res
          .status(400)
          .json({ message: "all feild are expected to be string." });
      }
    }

    if (about) {
      if (!isString(about)) {
        return res
          .status(400)
          .json({ message: "all feild are expected to be string." });
      }
    }
    const person = await Person.create({ name, hobbies, about });
    if (person) {
      const data = JSON.parse(JSON.stringify(person));
      data.id = data._id;
      delete data._id;
      delete data.__v;
      return res
        .status(201)
        .json({ success: true, message: "user created", result: data });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let person = await Person.findOneAndDelete({ name: id });
    if (!person) {
      if (!isValidId(id)) {
        return res.sendStatus(404);
      }
      person = await Person.findByIdAndDelete(id);
    }
    if (person) {
      const data = JSON.parse(JSON.stringify(person));
      data.id = data._id;
      delete data._id;
      delete data.__v;
      return res
        .status(200)
        .json({ success: true, message: "user deleted", result: data });
    }
    return res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let person = await Person.findOne({ name: id });
    if (!person) {
      if (!isValidId(id)) {
        return res.sendStatus(404);
      }
      person = await Person.findById(id);
    }
    if (!person) {
      return res.sendStatus(404);
    }
    const { name, about, hobbies } = req.body;
    if (name) {
      const duplicate = await Person.findOne({ name });
      if (duplicate) {
        return res.sendStatus(409);
      }
      if (!isString(name)) {
        return res
          .status(400)
          .json({ message: "name is expected to be string." });
      }
      person.name = name;
    }
    if (hobbies) {
      if (!isString(hobbies)) {
        return res
          .status(400)
          .json({ message: "hobbies is expected to be string." });
      }
      person.hobbies = hobbies;
    }
    if (about) {
      if (!isString(about)) {
        return res
          .status(400)
          .json({ message: "about is expected to be string." });
      }
      person.about = about;
    }
    await person.save();
    const data = JSON.parse(JSON.stringify(person));
    data.id = data._id;
    delete data._id;
    delete data.__v;
    return res
      .status(200)
      .json({ success: true, message: "user updated", result: data });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  try {
    if (req.params.name) {
      const { name } = req.params;
      let person = await Person.findOne({ name }).select("-__v").exec();
      if (!person) {
        person = isValidId(name) && (await Person.findById(name).exec());
      }
      if (!person) {
        return res.sendStatus(404);
      }
      const data = JSON.parse(JSON.stringify(person));
      data.id = data._id;
      delete data._id;
      delete data.__v;
      return res
        .status(200)
        .json({ success: true, message: "user found", result: data });
    }

    if (req.query.name) {
      const { name } = req.query;
      const person = await Person.find({ name }).select("-__v").exec();
      if (!person) {
        return res.sendStatus(404);
      }
      const data = JSON.parse(JSON.stringify(person));
      data.id = data._id;
      delete data._id;
      delete data.__v;
      return res
        .status(200)
        .json({ success: true, message: "user found", result: data });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getUsers = async (req, res) => {
  try {
    let persons = await Person.find({}).select("-__v").exec();
    if (!persons) {
      return res.sendStatus(500);
    }
    if (persons.length > 0) {
      persons = persons.map((person) => {
        const data = JSON.parse(JSON.stringify(person));
        data.id = data._id;
        delete data._id;
        delete data.__v;
        return data;
      });
    }
    return res.status(200).json({ success: true, result: persons });
  } catch (error) {
    console.log(error.stack);
    return res.sendStatus(500);
  }
};

module.exports = { addUser, deleteUser, updateUser, getUser, getUsers };
