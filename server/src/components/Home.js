import React, { useEffect, useState } from "react";

function Home() {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userHomePage();
  }, []);
  return (
    <>
      <div className="container">
        <p className="pt-5">WELCOME</p>
        <h1>{userName}</h1>
        <h2>{show ? "Happy to see you back" : "Mern Developers"}</h2>
      </div>
    </>
  );
}

export default Home;
