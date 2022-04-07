import "./App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReposAction,
  fetchProfileAction,
} from "./redux/slices/githubSlices";
import imgPic from "./img/gith.svg";

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  useEffect(() => {
    dispatch(fetchReposAction(`${user}`));
    dispatch(fetchProfileAction(`${user}`));
  }, [dispatch, user]);

  const store = useSelector((state) => state?.repos);
  const { loading, reposList, profile, error } = store;
  return (
    <>
      <section className="relative 2xl bg-gray-800 min-h-screen">
        <div class="relative container px-4 mx-auto">
          <div class="text-center mb-20">
            {/* <span class="text-lg text-blue-400 font-bold">
              Have a question?
            </span> */}
            <div class="flex justify-center">
              <img class="h-64  rounded-lg object-cover" src={imgPic} alt="" />
            </div>

            <h2 class="mt-10 mb-5 text-5xl font-bold font-heading text-indigo-300">
              GitHub Finder
            </h2>
            <div className="mt-1 flex justify-center">
              {/* input */}
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                type="text"
                name="email"
                id="email"
                className="shadow-sm text-center focus:ring-indigo-500 p-2 focus:border-indigo-500  sm:text-sm border-gray-300 w-full rounded-md lg:w-1/2"
                placeholder="Search For User"
              />
            </div>
          </div>
          {/* Content goes here */}
          {loading ? (
            <h1 className="flex justify-center w-full">Please Wait .....</h1>
          ) : error ? (
            <h1 className="flex justify-center w-full">Enter User UserName</h1>
          ) : (
            <div class="max-w-4xl mx-auto">
              <div class="flex flex-wrap -mx-4 mb-20">
                <div class="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
                  <div class="bg-gray-600 rounded-b-lg">
                    <div class="flex justify-center">
                      {/* Avatar image */}
                      <img
                        class="w-56 h-56 rounded-full"
                        src={profile?.avatar_url}
                        alt=""
                      />
                    </div>
                    <div class="px-14 py-8">
                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Name:{" "}
                        <span>
                          {profile?.name} {profile?.login}
                        </span>
                      </h4>
                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        {/* Bio goes here */}
                        Bio : {profile?.bio}
                      </h4>
                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        {/* Company goes here */}
                        Company : {profile?.company}
                      </h4>
                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        {/* Location goes here */}
                        Location : {profile?.location}
                      </h4>

                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        {/* followers goes here */}
                        Followers : {profile?.followers}
                      </h4>

                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        {/* following goes here */}
                        Following : {profile?.following}
                      </h4>

                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Repositories:{" "}
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-green-500 text-green-800">
                          {profile?.public_repos
                            ? profile?.public_repos
                            : "N/A"}
                        </span>
                      </h4>

                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Gists:{" "}
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-green-500 text-green-800">
                          {profile?.public_gists
                            ? profile?.public_gists
                            : "N/A"}
                        </span>
                      </h4>
                      <div class="mb-6 py-px bg-gray-500"></div>
                      <div class="md:text-right">
                        <a
                          href={profile?.html_url}
                          class="inline-block px-12 py-4 border border-gray-300 hover:border-gray-200 rounded-full font-bold text-white"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Repository list */}
                <div class="w-full lg:w-1/2 px-4">
                  {/* Loop this */}

                  <>
                    {reposList?.map((repo) => (
                      <div class="py-6 px-8 mb-4 bg-gray-600 rounded-lg">
                        <div class="flex items-center">
                          <a
                            href={repo?.html_url}
                            class="text-lg  text-indigo-400"
                          >
                            {repo.name}
                          </a>
                        </div>
                      </div>
                    ))}
                  </>

                  <div class="py-6 px-8"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
