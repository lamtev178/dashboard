import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ChangeBox from "./ChangeBox/ChangeBox";
import { useLazyLoad } from "../../hooks/useLazyLoad";
import ModalLoader from "../../UI/modalLoader/ModalLoader";
import { API_URL } from "../../utils/apiConstant";
import { handleRemoveItem } from "../../utils/Box";
import { ButtonAddBox } from "./buttonAddBox/ButtonAddBox";

export default function Home() {
  const [loader, setLoader, items, setItems] = useLazyLoad(() => getMoreBox());
  const [open, setOpen] = useState(false);
  const [changeBox, setChangeBox] = useState(null);
  console.log(open, changeBox);

  const getMoreBox = async () => {
    if (loader)
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}box?offset=${items.length || 0}&limit=25`,
          validateStatus: (status) => status < 500,
        });
        console.log("getBoxes =>> ", res);

        if (res.status < 400) setItems([...items, ...res.data]);

        return res;
      } catch (e) {
        console.log(e);
      } finally {
        setLoader(false);
      }
  };

  return (
    <Box>
      <ButtonAddBox />
      <ChangeBox box={changeBox} open={open} setOpen={setOpen} />
      <TableContainer component={Paper} sx={{ width: "100%", mb: "80px" }}>
        <ModalLoader visible={loader} />
        <Table stickyHeader aria-label="sticky table">
          <HomeTableHead />
          <HomeTableBody
            items={items}
            setItems={setItems}
            setChangeBox={setChangeBox}
            setOpen={setOpen}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}

function HomeTableBody({ items, setItems, setChangeBox, setOpen }) {
  return (
    <TableBody>
      {items.map((el) => (
        <TableRow
          hover
          key={el.id}
          sx={{ height: "85px" }}
          onClick={() => {
            setChangeBox(el);
            setOpen(true);
          }}
        >
          {Object.entries(el).map(([key, val]) => (
            <TableCell align="left" key={key}>
              {key === "boxType" ? val.type : val}
            </TableCell>
          ))}
          <TableCell align="left">
            <Button
              variant="contained"
              color="error"
              onClick={(e) => handleRemoveItem(e, el.id, setItems)}
              sx={{ width: "100px" }}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function HomeTableHead() {
  const headers = [
    "Id",
    "Name",
    "Price",
    "Description",
    "Box Type Id",
    "Box Type",
    "Delete",
  ];
  return (
    <TableHead>
      <TableRow>
        {headers.map((head) => (
          <TableCell key={head}>
            <h3>{head}</h3>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
