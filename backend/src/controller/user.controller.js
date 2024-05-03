import User from "../models/user.model.js";

async function Testing(req, res) {
  return res.status(200).json({ msg: "routing testing success" });
}

// GET /api/users: Retrieve all users with pagination support.
async function allUsers(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;

  try {
    const totalCount = await User.countDocuments();

    const totalPages = Math.ceil(totalCount / pageSize);

    const user = await User.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!user) {
      return res.status(500).json({ msg: "Retry" });
    }
    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      user,
    });
  } catch (error) {
    console.log("error in allUsers controller ", error);
  }
}

// GET /api/users/:id: Retrieve a specific user by ID. -- user gets retrived based on id provide from mockData
async function retrieveById(req, res) {
  const userId = req.query.id;
  const name = req.query.name;

  try {
    const user = await User.findOne({
      $or: [{ id: userId }, { first_name: name }],
    });

    if (!user) {
      return res.status(400).json({ msg: "give valid id" });
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    console.log("error at reteriving user ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// POST /api/users: Create a new user.
async function createUser(req, res) {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    avatar,
    domain,
    available,
  } = req.body;
  try {
    const userExist = await User.findOne({
      $or: [({ email }, { first_name })],
    });

    if (userExist) {
      return res.status(400).json({ msg: "User already exist" });
    }

    const userCreated = await User.create({
      id,
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    });

    if (userCreated) {
      return res.status(200).json({ msg: "User created successfully" });
    }
  } catch (error) {
    console.log("error in user creation ", error);
    res.status(400).json({ msg: "Try again" });
  }
}

// PUT /api/users/:id: Update an existing user.
async function updateUser(req, res) {
  const { userId } = req.params.id;
  const { first_name, last_name, email, gender, avatar, domain, available } =
    req.body;

  const userExist = await User.findOne({ id: userId });
  if (!userExist) {
    return res.status(400).json({ msg: "Invalid id" });
  }

  const updateUser = await User.updateOne({});
}

// DELETE /api/users/:id: Delete a user.
async function deleteUser(req, res) {
  const userId = req.query.id;

  try {
    const userExist = await User.findOne({ id: userId });
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid id" });
    }

    const deleteUser = await User.deleteOne({ id: userId });

    if (deleteUser) {
      return res.status(200).json({ msg: "User deleted successfully" });
    }
  } catch (error) {
    console.log("error at deleting user ", error);
    return res.status(500).json({ msg: "try again" });
  }
}

//Implement filtering
async function filterSearch(req, res) {
  //get data
  //validate data
  //check for user with name , domain, gender, availability

  const { domain, gender, availability } = req.body;

  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;

  try {
    const totalCount = await User.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);

    const query = {};

    if (domain) query.domain = domain;
    if (gender) query.gender = gender;
    if (availability !== undefined) query.available = availability;

    const users = await User.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({ totalPages: totalPages, users });
  } catch (error) {
    console.error("Error finding users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export {
  Testing,
  allUsers,
  retrieveById,
  createUser,
  deleteUser,
  filterSearch,
};
