import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ModalLoader from "../../UI/modalLoader/ModalLoader";
import { getBoxTypes } from "../../utils/BoxTypes";

export default function BoxTypes() {
  const [loader, setLoader] = useState(false);
  const [types, setTypes] = useState([]);
  useEffect(() => {
    (async function () {
      setLoader(true);
      setTypes(await getBoxTypes());

      setLoader(false);
    })();
  }, []);
  return (
    <TableContainer component={Paper} sx={{ width: "100%", mb: "80px" }}>
      <ModalLoader visible={loader} />
      <Table stickyHeader aria-label="sticky table">
        <TableHead sx={{ p: 3 }}>
          <TableRow>
            <TableCell>
              <h1>Types of Box</h1>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {types.map((el) => (
            <TableRow hover key={el.id} sx={{ height: "85px" }}>
              <TableCell align="left">{el.id}</TableCell>
              <TableCell align="left">
                <h2>{el.type}</h2>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
