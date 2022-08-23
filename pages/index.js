import Head from "next/head";

import React, { useState } from "react";
import PageNumber from "./pageNumber";

export async function getServerSideProps() {
  try {
    const response = await fetch("https://dummyjson.com/users?limit=100");
    const data = await response.json();

    if (response.statusCode >= 400) {
      return {
        props: {
          statusCode: response.statusCode,
        },
      };
    }
    return {
      props: {
        users: data.users,
        statusCode: 200,
      },
    };
  } catch (error) {
    return {
      props: {
        statusCode: 500,
      },
    };
  }
}

export default function Home({ users, statusCode }) {
  const [page, setPage] = useState(1);
  const [userPerPage] = useState(30);

  let pageNumbers = [];
  if (users?.length) {
    pageNumbers = [...Array(Math.ceil(users?.length / userPerPage)).keys()];
  }

  const goToPage = (event) => {
    setPage(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>Our Users</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex flex-col items-center justify-between w-full text-slate-50">
        <h1 className="">
          {statusCode == 200 ? "Our users" : "Something went wrong  :("}
        </h1>
        {users?.length && (
          <table className="w-5/6 my-10 ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Maiden Name</th>
                <th className="extra-column">Age</th>
                <th className="extra-column">Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
                if (
                  idx + 1 <= page * userPerPage &&
                  idx + 1 > page * userPerPage - userPerPage
                ) {
                  return (
                    <tr className="user-row" key={user.id}>
                      <td>{user.id}.</td>
                      <td>
                        <img
                          src={user.image}
                          height="30"
                          width="30"
                          alt="User picture"
                        ></img>
                      </td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.maidenName}</td>
                      <td className="extra-column">{user.age}</td>
                      <td className="extra-column">{user.gender}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        )}

        <nav>
          <ul className="inline-flex -space-x-px">
            {pageNumbers.map((num) => (
              <PageNumber
                key={num + 1}
                value={num + 1}
                handleClick={goToPage}
                currentPage={page}
                usersLength={users?.length}
              />
            ))}
          </ul>
        </nav>
      </main>

      <footer className="flex flex-col items-center justify-center w-full text-slate-50 my-5">
        <a href="https://meggy.es" target="_blank">
          Created by Gabi 🍒
        </a>
      </footer>
    </div>
  );
}
