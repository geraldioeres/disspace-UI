import { useState, useEffect } from "react";
import {
  momodList,
  dummyCategory,
  topUser,
  categoryList,
  threadData,
} from "../dummyData";
import LeaderBoards from "../components/LeaderBoards";
import CategoryList from "../components/CategoryList";
import NavbarV2 from "../components/NavbarV2";
import Thread from "../components/thread";
import ThreadSelector from "../components/ThreadSelector";
import Footer from "../components/Footer";
import axios from "axios";
import { GetCategoriesAPI, GetThreadAPI, GetLeaderboard } from "./api/Helpers";

const option = [
  { name: "recent", value: "created_at" },
  { name: "most upvote", value: "num_votes" },
  { name: "most commented", value: "num_comments" },
];

export default function Home() {
  const [limit, setLimit] = useState(4);
  const [threadData, setThreadData] = useState();
  const [catData, setCatData] = useState();
  const [getLeaderboardData, setLeaderboard] = useState()
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(option[0]);
  // const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [threadsData, categoriesData, leaderBoardData] = await Promise.all([
          axios({
            method: "get",
            url: GetThreadAPI(),
            params: {
              sort: selected.value,
            },
          }),
          axios({
            method: "get",
            url: GetCategoriesAPI(),
          }),
          axios({
            method: 'get',
            url : GetLeaderboard(),
          })
        ]);
        setThreadData(threadsData?.data);
        setCatData(categoriesData?.data);
        setLeaderboard(leaderBoardData?.data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [selected]);

  return (
    <div className="flex flex-col justify-center lg:items-center">
      <NavbarV2 />
      {loading ? (
        <div className="flex items-center justify-center my-80 space-x-2 animate-bounce">
          <div className="w-5 h-5 bg-orange rounded-full"></div>
          <div className="w-5 h-5 bg-lightOrange rounded-full"></div>
          <div className="w-5 h-5 bg-gray rounded-full"></div>
        </div>
      ) : (
        <div>
          <div>
            <div className="flex flex-col md:flex-row my-8 gap-x-14">
              {/* thread */}
              <div className="">
                <div className="flex flex-row justify-between">
                  <div className="p-5">All threads</div>
                  <div className="z-20 mt-1">
                    <ThreadSelector
                      option={option}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </div>
                </div>
                <div className="max-w-2xl">
                  {threadData?.data
                    ?.slice(0, limit != null ? limit : threadData?.length)
                    .map((data) => (
                      <Thread data={data} key={data?._id} limit={limit} />
                    ))}
                </div>
                {limit == threadData?.length ? (
                  ""
                ) : (
                  <button
                    className="bg-lightOrange hover:bg-orange text-white font-bold py-2 px-4 rounded mt-4 w-full"
                    onClick={() => setLimit(threadData?.length)}
                  >
                    View All
                  </button>
                )}
                <div className="mx-3 md:mx-0"></div>
              </div>
              {/* side content */}
              <div className="flex flex-col items-center my-8 md:my-0">
                <div>
                  <LeaderBoards topUsers={getLeaderboardData?.data} />
                </div>
                <div className="py-8">
                  <CategoryList categories={catData?.data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
