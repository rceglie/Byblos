import React, { useState, useEffect } from "react";
import styles from "./post.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import * as api from "../../api";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ScheduleSelector from "react-schedule-selector";

const Post = ({ post }) => {
  const [user, setUser] = useState([]);
  const [showSum, setShowSum] = useState("false");
  console.log(post.times);

  useEffect(() => {
    async function fetchData() {
      const data = await api.fetchUser(post.creator);
      setUser(data.data);
    }
    fetchData();
  }, []);

  const discordClicked = async () => {
    window.open("http://discordapp.com/users/" + user.discord, "_blank");
  };

  const renderDateCell = (time, selected, innerRef) => (
    <div style={{ textAlign: "center" }} ref={innerRef}>
      <div
        style={{
          height: "1vh",
          width: "100%",
          backgroundColor: selected ? "blue" : "lightBlue",
        }}
      ></div>
    </div>
  );

  const renderTimeLabel = (time) => <div></div>;

  const getRanges = () => {
    if (post.times != undefined) {
      let times = post.times.sort((a, b) => {
        return b < a ? 1 : -1;
      });
      //console.log(post.times)
      let res = [];
      let startTime = times[0];
      console.log(startTime);
      for (let i = 0; i < times.length - 1; i++) {
        if (new Date(times[i + 1]) - new Date(times[i]) != 3600000) {
          res.push({ start: startTime, end: times[i] });
          startTime = times[i + 1];
        }
      }
      res.push({ start: startTime, end: times[times.length - 1] });
      console.log(res);
      return res;
    }
    return [];
  };

  return (
    <div className={styles.postwrapper}>
      <div className={styles.leftcontent}>
        <div>{user.name}</div>
        <div>{8 - post.roles.length}/8</div>
        <div>
          {post.fight} , {post.prog}
        </div>
        <div>{post.times.length} hr/week</div>
      </div>
      <p className={styles.summary}>{post.sum}</p>
      <div className={styles.seemore}>
        <Popup
          trigger={
            <button style={{ width: "100%", height: "5.5vh" }}>See More</button>
          }
          position="center"
          modal
          contentStyle={{
            width: "60vw",
            border: "#673FD7 10px inset",
            borderRadius: "5%",
            height: "70vh",
          }}
        >
          {(close) => (
            <div className={styles.extendedpostwrapper}>
              <h1>{user.name}'s Group</h1>
              <div className={styles.extendedcontent}>
                <div className={styles.extendedleft}>
                  <ScheduleSelector
                    selection={post.times}
                    rowGap={"0px"}
                    renderDateCell={renderDateCell}
                    renderTimeLabel={renderTimeLabel}
                    numDays={7}
                    minTime={0}
                    maxTime={24}
                    hourlyChunks={1}
                    dateFormat={"ddd"}
                    timeFormat={"hh:mm A"}
                    startDate={"11-20-2022"}
                    columnGap={".5vw"}
                  />
                  <div className={styles.timesinfo}>
                    <table>
                      {getRanges()?.map((segment) => {
                        var daysOfWeek = [
                          "Sun",
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat",
                        ];
                        var start = segment.start;
                        var end = segment.end;
                        return (
                          <tr style={{ textAlign: "center" }}>
                            <td>
                              {(end.getTime() - start.getTime()) /
                                (60 * 60 * 1000) +
                                " hr."}
                            </td>
                            <td>{daysOfWeek[start.getDay()].padEnd(5, " ")}</td>
                            <td>
                              {start
                                .toLocaleString("en-US", { hour: "numeric" })
                                .toLowerCase()}
                            </td>
                            <td>-</td>
                            <td>
                              {end
                                .toLocaleString("en-US", { hour: "numeric" })
                                .toLowerCase()}
                            </td>
                            <td>
                              {daysOfWeek[end.getDay()] ==
                              daysOfWeek[start.getDay()]
                                ? ""
                                : "(" + daysOfWeek[end.getDay()] + ")"}
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                    <p style={{ textAlign: "center" }}>
                      Total: {post.times.length} hours
                    </p>
                  </div>
                </div>
                <div className={styles.extendedmiddle}>
                  <h1>{8 - post.roles.length}/8</h1>
                  <p>{post.fight}</p>
                  <p>{post.prog}</p>
                  <p>{post.ilvl}</p>
                  <p>{post.prog}</p>
                  <p>{post.fight}</p>
                  <p>{post.prog}</p>
                </div>
                <div className={styles.extendedright}>
                  <ToggleButtonGroup exclusive value={showSum}>
                    <ToggleButton
                      value="true"
                      onClick={() => setShowSum("true")}
                    >
                      Brief Summary
                    </ToggleButton>
                    <ToggleButton
                      value="false"
                      onClick={() => setShowSum("false")}
                    >
                      Detailed Description
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <p>{showSum == "true" ? post.sum : post.desc}</p>
                </div>
              </div>
              <button onClick={discordClicked}>Contact</button>
            </div>
          )}
        </Popup>
      </div>

      {/* <Typography variant="h6">LFM Post</Typography>
            <Typography variant="body2">Fight: {post.fight}</Typography>
            <Typography variant="body2">Times: {post.times}</Typography>
            <Typography variant="body2">Prog:  {post.prog}</Typography>
            <Typography variant="body2">Roles: {post.roles}</Typography>
            <Typography variant="body2">ilvl:  {post.ilvl}</Typography>
            <Typography variant="body2">Exp:   {post.exp}</Typography>
            <Typography variant="body2">Summary:   {post.sum}</Typography>
            <Typography variant="body2">Description:  {post.desc}</Typography>
            <Typography variant="body2">Posted by: {post.name}</Typography>
            <Typography variant="body2">Created {moment(post.createdAt).fromNow()}</Typography> */}
    </div>
  );
};

export default Post;
