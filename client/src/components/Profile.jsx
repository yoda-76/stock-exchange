import {useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState(window.localStorage.getItem("email"));
  const [updatedMainData, setUpdatedMainData] = useState();
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  console.log(window.localStorage.getItem("email"));
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = {
      apiKey,
      secretKey,
    };
    fetch(`http://localhost:4000/profile/saveKeyAndSecret`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: Email,
        key: formDataObj.apiKey,
        secret: formDataObj.secretKey,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(window.localStorage.getItem("email")), console.log(data);
        if (data) {
          setUpdatedMainData((prev) => {
            if (!Array.isArray(prev)) {
              return [formDataObj];
            }

            return [...prev, formDataObj];
          });
          console.log("Form data updated successfully");
        } else {
          console.error("Error updating form data inside:", data.data);
        }
      })
      .catch((error) => {
        console.error("Error updating form data:", error);
      });
  };

  function handleButtonClick() {
    window.open(
      `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=b643879d-2584-48ef-81c4-29fe850e4ded&redirect_uri=http://localhost:4000/auth&state=${Email}`,
      '_blank'
    );
       }
  const handleLogout = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="h-screen w-full bg-opacity-70 text-white m-0 ok">
        <div className="w-full border-b-2 border-cyan-800  p-3 flex justify-between">
          <h1 className="text-2xl text-cyan-300"> Stock Exchange</h1>
          <button
            className="text-2xl text-cyan-300  p-2 "
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className=" flex w-full h-4/6">
          <div className="border-r-2 font-thin  border-cyan-800 w-1/4 flex items-center justify-center text-4xl text-cyan-300 capitalize">
            <Typewriter
              onInit={(typewriter) => {
                typewriter

                  .typeString(` Welcome to Stock Exchange`)
                  .callFunction(() => {})

                  .start();
              }}
            />
          </div>

          <div className="m-3 w-3/4 flex flex-col items-center justify-center ">
            <form
              className="border-2 border-cyan-300  flex flex-col p-5 w-1/2 transition-transform"
              onSubmit={handleSubmit}
            >
              <div class="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  id="apiKey"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <label
                  for="apiKey"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-300 peer-focus:dark:text-cyan-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  API Key :
                </label>
              </div>

              <div class="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  id="secretKey"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                />
                <label
                  for="apiKey"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-300 peer-focus:dark:text-cyan-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Secret Key :
                </label>
              </div>

              <button
                type="submit"
                className="   text-black bg-cyan-300 hover:bg-cyan-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-300 dark:hover:bg-cyan-700 dark:focus:ring-cyan-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="h-content w-full ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
              <thead className="border-t border-cyan-800 bg-gray-800 ">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Api Key
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Secret key
                  </th>
                  <th scope="col" className="px-6 py-4">
                    <span class="sr-only"></span>
                  </th>
                  <th scope="col" className="px-6 py-4">
                    <span class="sr-only"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {updatedMainData &&
                  updatedMainData.map((item) => {
                    return (
                      <tr class="">
                        <td class="px-6 py-4">{item.apiKey}</td>
                        <td class="px-6 py-4">{item.secretKey}</td>
                        <td class="px-6 py-4 text-right">
                            <button
                              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                              onClick={() => {
                                handleButtonClick(item.broker);
                              }}
                            >
                              Generate Token
                            </button>
                        </td>
                        <td class="px-6 py-4 text-right">
                          <button
                            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={() => {
                              window.location.href = "./tradeDashboard";
                            }}
                          >
                            Trade Now
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
