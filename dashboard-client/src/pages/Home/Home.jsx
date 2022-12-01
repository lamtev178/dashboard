import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useLazyLoad } from "../../hooks/useLazyLoad";
import ModalLoader from "../../UI/modalLoader/ModalLoader";
import { API_URL } from "../../utils/apiConstant";
import { handleRemoveItem } from "../../utils/Box";

export default function Home() {
  const [loader, setLoader, items, setItems] = useLazyLoad(() => getMoreBox());

  const getMoreBox = async () => {
    if (loader)
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}box?offset=${
            items[items.length - 1]?.id || 0
          }&limit=25`,
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
    <TableContainer component={Paper} sx={{ width: "100%", mb: "80px" }}>
      <ModalLoader visible={loader} />
      <Table stickyHeader aria-label="sticky table">
        <HomeTableHead />
        <HomeTableBody items={items} setItems={setItems} />
      </Table>
    </TableContainer>
  );
}

function HomeTableBody({ items, setItems }) {
  console.log(items);
  return (
    <TableBody>
      {items.map((el) => (
        <TableRow hover key={el.id} sx={{ height: "85px" }}>
          {Object.entries(el).map(([key, val]) => (
            <TableCell align="left" key={key}>
              {val}
            </TableCell>
          ))}
          <TableCell align="left">
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveItem(el.id, setItems)}
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
