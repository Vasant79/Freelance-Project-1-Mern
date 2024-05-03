import Team from "../models/team.model.js";
import User from "../models/user.model.js";

async function testing(req, res) {
  return res.status(200).json({ msg: "team route testing success" });
}

async function createTeam(req, res) {
  //get data -- will get array of names
  // create team if data is not null

  const { teamMember } = req.body;
  const teamId = 1;

  try {
    // Create a new team with the provided team ID and member ObjectIds
    const team = await Team.create({
      id: teamId,
      members: teamMember,
    });

    return res.status(201).json({ msg: "successfull", team });
  } catch (error) {
    console.error("Error creating team:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/team/:id: Retrieve the details of a specific team by ID.
async function teamDetails(req, res) {
  //get the data - id
  //check if team of that id exist in db
  const teamId = req.query.id;
  console.log("teamId-->", teamId);
  try {
    const teamExist = await Team.findOne({ id: teamId });
    if (!teamExist) {
      return res.status(400).json({ msg: "invalid team id" });
    }

    return res.status(200).json({ team: teamExist });
  } catch (error) {
    console.log("error at team details ", error);
    return res.status(500).json({ msg: "Try again" });
  }
}

export { testing, createTeam, teamDetails };
