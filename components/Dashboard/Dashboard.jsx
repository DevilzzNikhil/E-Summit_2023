import React, { Component, useEffect } from "react";
import style from "./Dashboard.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserAuth } from "../../context/AuthContext";
import {
  TableCell,
  TableContainer,
  TableHead,
  Table,
  Paper,
  TableRow,
  TableBody,
} from "@mui/material";

function createData(rank, name, email) {
  return { rank, name, email };
}
const Loader = () => {
  return (
    <lottie-player
      src="https://assets4.lottiefiles.com/packages/lf20_zy7c7hn2.json"
      background="transparent"
      speed="1"
      style={{ width: "300px", height: "300px" }}
      loop
      autoplay
    ></lottie-player>
  );
};
const Dashboard = () => {
  const router = useRouter();
  const { handleGoogleSignIn, logout, user, isLoggedIn } = UserAuth();
  const registrations = user.registrations?.map((person, id) =>
    createData(id, person.name, person.email)
  );
  // useEffect(() => {
  //   setTimeout(() => {
  //     !user?.name &&
  //       setTimeout(() => {
  //         !user?.name && router.replace("/");
  //       }, 1000);
  //   }, 3000);
  // }, []);
  return (
    <>
      {!user?.name ? (
        <div className="inline-flex w-full sm:mx-2">
          <button
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
            onClick={() => handleGoogleSignIn()}
            style={{ margin: "100px auto" }}
          >
            Login
          </button>
        </div>
      ) : (
        <div className={style.container1}>
          {/* {redirect()} */}
          <div className={`${style.row}  ${style.row1} `}>
            <div className={style.col} style={{ flexBasis: "100%" }}>
              <div className={style.imgBox}>
                <Image
                  className={style.imgBox}
                  src={user.avatar}
                  width="300"
                  height="300"
                  alt={user.name[0].toUpperCase()}
                />
              </div>
              <div>
                <h1 className={style.userName}>{user.name}</h1>
                <p style={{ fontSize: "1.5rem" }}>{user.email}</p>
              </div>

              <div className={style.row4}>
                <h1 className={style.data}>REFERAL CODE:</h1>
                <h1 className={style.data} style={{ color: "#c084fc" }}>
                  {user.referral_code}
                </h1>
              </div>
            </div>
          </div>
          <div className={`${style.row}  ${style.row2} `}>
            <div className={`${style.col}  ${style.col2} `}>
              <h1 className={style.heading}>Leaderboard</h1>
              <div>
                <h1
                  className={style.heading}
                  style={{ color: "#c084fc" }}
                >{`Coming soon!`}</h1>
              </div>
            </div>
            <div className={`${style.col}  ${style.col2} `}>
              <h1 className={style.heading}>
                Registrations:{" "}
                <span style={{ color: "#c084fc" }}>{registrations.length}</span>
              </h1>
              <div>
                {registrations.length ? (
                  <RegistrationsTable rows={registrations} />
                ) : (
                  <h1 className={style.heading} style={{ color: "red" }}>
                    No registrations!
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      />
    </>
  );
};

function RegistrationsTable({ rows }) {
  return (
    <Paper sx={{ width: "95%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sr.No.</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.rank}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Dashboard;
