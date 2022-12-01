import { Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { addBox } from "../../../utils/Box";
import styles from "./ButtonAddBox.module.scss";

export function ButtonAddBox() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      price: price,
      description: description,
    };
    const res = await addBox(data);
    setOpen(false);
    console.log(res);
  };

  return (
    <div className={styles.btn_add_server}>
      <Button variant="contained" onClick={handleOpen}>
        Add Box
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
              type="number"
              className={styles.modal_form_input}
              id="outlined-basic"
              label="price"
              variant="outlined"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={!name || !description || !price}
            >
              Add
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
