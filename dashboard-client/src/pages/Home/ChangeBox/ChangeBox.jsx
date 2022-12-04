import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { changeBox } from "../../../utils/Box";
import { getBoxTypes } from "../../../utils/BoxTypes";
import styles from "../HomeModal.module.scss";

export default function CreateBox({ open, setOpen, box }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState(null);
  const [typesList, setTypes] = useState([]);

  function handleClickType(e) {
    console.log(e);
    setType(e);
  }

  useEffect(() => {
    (async function () {
      setTypes(await getBoxTypes());
    })();
  }, []);

  useEffect(() => {
    if (!open) return;
    setName(box?.name);
    setDescription(box?.description);
    setPrice(box?.price);
    setType(box?.boxType);
  }, [open, box]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      price: price,
      description: description,
      type: type,
    };
    const res = await changeBox(data, box.id);
    setOpen(false);
    console.log(res);
  };
  console.log(type);
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={styles.modal}>
        <form className={styles.modal_form} onSubmit={handleSubmit}>
          <TextField
            className={styles.modal_form_input}
            id="outlined-basic"
            label="name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            className={styles.modal_form_input}
            id="outlined-basic"
            label="description"
            variant="outlined"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            className={styles.modal_form_input}
            type="number"
            id="outlined-basic"
            label="price"
            variant="outlined"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <FormControl sx={{ minWidth: "100%" }}>
            <InputLabel id="select-label">Type</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={type || ""}
              label="Type"
              onChange={(e) => handleClickType(e.target.value)}
            >
              {typesList &&
                typesList.map((type) => (
                  <MenuItem value={type} key={type.id}>
                    {type.type}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            disabled={!name || !description || !price || !type}
          >
            Change
          </Button>
        </form>
      </div>
    </Modal>
  );
}
