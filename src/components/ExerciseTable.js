/**************************************************************************
 * ExerciseTable component
 *
 * This component returns an antd Table component showing the signed in
 * user's exercises
 **************************************************************************/
import { useEffect, useState } from "react";
import { user } from "./App.js";
import { Table } from "antd";
import axios from "axios";
import { EC2_URL } from "../index.js";

// Columns for exercise table
const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Reps", dataIndex: "reps", key: "reps" },
  { title: "Sets", dataIndex: "sets", key: "sets" },
];
const exercises = [];

export default function ExerciseTable() {
  const [tableData, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's exercises from db
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${EC2_URL}/api/create-table`, {
          user: user.username,
        });
        setData(response.data.exercises[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Once data is fetched, load each exercise into tableData
  useEffect(() => {
    if (!exercises) return;

    exercises.forEach((entry, index) => {
      let temp = {
        key: index + 1,
        name: entry.name,
        type: entry.type,
        reps: entry.reps,
        sets: entry.sets,
      };
      tableData.push(temp);
    });
  }, [tableData]);

  return <Table columns={columns} dataSource={tableData} loading={loading} />;
}
