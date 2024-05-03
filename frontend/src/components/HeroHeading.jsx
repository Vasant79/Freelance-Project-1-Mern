import { useState, useEffect } from "react";
import DropDown from "./DropDown";
import Button from "./Button";
import axios from "axios";

/**
 * Note search is case sensitive -
 * eg - Anet -> will return result matching anet
 *  in search input - type user id or name from mock data, press enter  & see the result
 */

export default function HeroHeadingrd({ setData, team }) {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [availability, setAvailability] = useState();
  const [display, setDisplay] = useState(false);
  const [teamInfo, setTeamInfo] = useState([]);

  function getUser() {
    const fetch = async () => {
      const response = await axios.get(`api/user/retrieveById?name=${search}`);
      // console.log(response.data.user);

      let searchedUser = response.data.user;
      setData([searchedUser]);
    };
    fetch();
  }

  async function handleFilterUser() {
    const response = await axios.post("api/user/filterSearch", {
      domain: domain,
      gender: gender,
      availability: availability,
    });
    setData(response.data.users);
    console.log(response.data.users);
  }

  async function handleTeamCreation() {
    const response = await axios.post("api/team/createTeam", {
      teamMember: team,
    });

    setTeamInfo(team);
    alert("team created");
  }

  console.log("team info state ", teamInfo);

  function handleTeamInfo() {
    setDisplay(!display);
  }

  console.log("display ", display);

  function handleSubmit(event) {
    event.preventDefault();
    getUser();
  }

  const displayInfo = teamInfo.map((eachMember) => (
    <div
      key={eachMember.email}
      className=" h-auto m-1  p-2 border-2 border-gray-100 rounded-md lg:w-1/5"
    >
      {eachMember.first_name} {eachMember.last_name} <br />
      {eachMember.email} <br />
      {eachMember.domain} <br />
      {eachMember.availability}
    </div>
  ));

  return (
    <div>
      <div className=" my-8 p-2 w-full flex  flex-col items-center  bg-gray-200 rounded-md shadow-md">
        <div className="mt-2">
          <form onSubmit={handleSubmit}>
            <label>Search User </label>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
          </form>
        </div>

        <div className="w-full my-4 flex items-center sm:justify-center">
          <DropDown
            id="domain"
            setState={setDomain}
            options={["Sales", "IT", "Marketing", "Finance"]}
          >
            Domain
          </DropDown>
          <DropDown
            id="gender"
            setState={setGender}
            options={["Male", "Female"]}
          >
            Gender
          </DropDown>
          <DropDown
            id="availability"
            setState={setAvailability}
            options={[true, false]}
          >
            Availabilty
          </DropDown>
        </div>

        <div className="mx-2 flex">
          <Button onClick={handleFilterUser}>Search</Button>
          <Button onClick={handleTeamCreation}>Create Team</Button>
          <Button onClick={handleTeamInfo}>Team Info</Button>
        </div>
      </div>

      <div className=" w-full m-1 ">
        <div className=" w-full  overflow-auto">
          <span className="font-md text-xl  ">
            {" "}
            {display ? "Team Members" : null}
          </span>
          <div className="lg:flex "> {display ? displayInfo : null}</div>
        </div>
      </div>
    </div>
  );
}
