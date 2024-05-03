import User from "../models/user.model.js";
import mockData from "../../mockData.js";

export async function populateMockData() {
  const mockDataInserted = await User.insertMany(mockData);

  if (mockDataInserted) {
    return true;
  }
  return false;
}
