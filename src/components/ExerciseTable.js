/**************************************************************************
 * ExerciseTable component
 **************************************************************************/
import { useEffect, useState } from "react";
import { user } from "./App.js";
import { Table } from "antd";
import axios from "axios";

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/create-table",
          { user: user._name }
        );
        setData(response.data.exercises[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (exercises) {
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
    }
  }, [exercises]);

  return <Table columns={columns} dataSource={tableData} loading={loading} />;
}
