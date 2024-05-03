import { useEffect, useState } from "react";
import HeroHeading from "../HeroHeading";
import Button from "../Button";
import axios from "axios";

export default function LandingPage() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await axios.get(`api/user/allUsers?page=${currentPage}`);
    setData(response.data.user);
    setTotalPages(response.data.totalPages);
  };

  function handlePreviousPage() {
    setCurrentPage((prevState) => prevState - 1);
  }
  function handleNextPage() {
    setCurrentPage((prevState) => prevState + 1);
  }

  const renderData = data
    ? data.map((eachData) => {
        return (
          <div
            key={eachData._id}
            className="m-4 p-4  shadow-md border-md flex justify-center hover:bg-gray-100   sm:justify-center"
            onClick={() => setTeam([...team, eachData])}
          >
            <span>
              {eachData.first_name} {eachData.last_name}
            </span>
          </div>
        );
      })
    : null;

  return (
    <div>
      <HeroHeading setData={setData} team={team}></HeroHeading>

      {renderData ? renderData : null}
      <div className="  flex justify-center items-center ">
        <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}
