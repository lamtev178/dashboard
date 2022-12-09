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

export default function CreateBox({ open, setOpen, box, setItems }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState(null);
  const [typesList, setTypes] = useState([]);

  function handleClickType(e) {
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
    setType(box?.boxType.type);
  }, [open, box]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const typeId = typesList.filter((alltypes) => alltypes.type === type)[0];
    const data = {
      name: name,
      price: price,
      description: description,
      boxTypeId: typeId.id,
    };
    const res = await changeBox(data, box.id);
    if (res?.status < 400) {
      setItems((items) =>
        items.map((item) =>
          item.id === box.id
            ? { id: box.id, ...data, boxTypeId: typeId.id, boxType: typeId }
            : item
        )
      );
    }
    setOpen(false);
  };
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
                  <MenuItem value={type.type} key={type.id}>
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
