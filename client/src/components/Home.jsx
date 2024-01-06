import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Typewriter from "typewriter-effect";
// import { Dna } from "react-loader-spinner";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState("");
  const [mainData, setMainData] = useState({
    apiKey: "",
    secretKey: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [show, setShow] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);



  // useEffect(() => {
  //   const token = window.localStorage.getItem("token");
  //   const email = window.localStorage.getItem("email");
  //   console.log(email, "email");
  //   const username = window.localStorage.getItem("username");
  //   if (token) {
  //     fetch(`${API_URL}/checkAuth`, {
  //       method: "POST",
  //       crossDomain: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify({
  //         token: token,
  //         email: email,
  //         username: username,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.status === "ok") {
  //           setUserData(data.data);
  //           setIsLoggedIn(true);
  //         } else {
  //           window.localStorage.clear();
  //           window.location.href = "./sign-in";
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //       });
  //   } else {
  //     window.location.href = "./login";
  //   }
  // }, []);

  if (!isLoggedIn) {
    return (
      <div className=" h-screen w-full flex items-center justify-center bg-black">
        {/* <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        /> */}
      </div>
    );
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formDataObj = {
  //     apiKey,
  //     secretKey,
  //   };
  //   fetch(`${API_URL}/userData`, {
  //     method: "POST",
  //     crossDomain: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({
  //       token: window.localStorage.getItem("token"),
  //       BrokerList: formDataObj, 
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status) {
  //         setUpdatedMainData((prev) => {
  //           if (!Array.isArray(prev)) {
  //             return [formDataObj];
  //           }

  //           return [...prev, formDataObj];
  //         });
  //         console.log("Form data updated successfully");

  //       } else {
  //         console.error("Error updating form data inside:", data.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating form data:", error);
  //     });
  //   setShowForm(false);
  //   setShow(true);
  // };

  function handleButtonClick(brokerName) {
    setIsGeneratingToken(true);
    fetch(`http://localhost:4000/auth`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        brokerName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          console.log("congrats yoda");
        } else {
          console.log("failed");
        }

        setIsGeneratingToken(false);
        toast.success("Token Generated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }
  const handleLogout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <>
      <div className="h-screen w-full bg-opacity-70 text-white m-0 ok">
      <div className="w-full border-b-2 border-cyan-800  p-3 flex justify-between">
        <h1 className="text-2xl text-cyan-300"> Stock Exchange</h1>
        <button className="text-2xl text-cyan-300  p-2 " onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className=" flex w-full h-4/6">
        <div className="border-r-2 font-thin  border-cyan-800 w-1/4 flex items-center justify-center text-4xl text-cyan-300 capitalize">
          <Typewriter
            onInit={(typewriter) => {
              typewriter

                .typeString(` Welcome ${userData.FullName}`)
                .callFunction(() => {
                })

                .start();
            }}
          />
        </div>

        <div className="m-3 w-3/4 flex flex-col items-center justify-center ">
          {showForm && (
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
                // onClick={handleShowData}
                className="   text-black bg-cyan-300 hover:bg-cyan-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-300 dark:hover:bg-cyan-700 dark:focus:ring-cyan-600"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="h-content w-full ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
            <thead className="border-t border-cyan-800 bg-gray-800 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date and Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Secret key
                </th>
                <th scope="col" className="px-6 py-3">
                  totp
                </th>
                <th scope="col" className="px-6 py-3">
                  <span class="sr-only"></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {updatedMainData &&
                updatedMainData.map((item) => {
                  return (
                    <tr class="">
                      <td class="px-6 py-4">{item.totp}</td>
                      <td class="px-6 py-4">{item.secretKey}</td>
                      <td class="px-6 py-4 text-right">
                        {isGeneratingToken ? (
                          <span className="text-yellow-500">
                            <ColorRing
                              visible={true}
                              height="80"
                              width="80"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={[
                                "#e15b64",
                                "#f47e60",
                                "#f8b26a",
                                "#abbd81",
                                "#849b87",
                              ]}
                            />
                          </span>
                        ) : (
                          <button
                            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={() => {
                              handleButtonClick(item.broker);
                            }}
                          >
                            Generate Token
                          </button>
                        )}
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

export default Home;