import axios from "axios";
import { API_URL } from "../apiConstant";

export async function handleRemoveItem(e, id, setItems) {
  e.stopPropagation();
  try {
    const res = await axios({
      method: "delete",
      url: `${API_URL}box?id=${id}`,
    });
    console.log("delete box =>> ", res);
    if (res.status < 400) {
      setItems((items) => items.filter((item) => item.id !== id));
    }
    return [];
  } catch (e) {
    console.log(e);
  }
}
export async function addBox(box) {
  try {
    const res = await axios({
      method: "post",
      url: `${API_URL}box`,
      data: box,
    });
    console.log("add box =>> ", res);
  } catch (e) {
    console.log(e);
  }
}
export async function changeBox(box, id) {
  try {
    const res = await axios({
      method: "patch",
      url: `${API_URL}box?id=${id}`,
      data: box,
    });
    console.log("add box =>> ", res);
    return res;
  } catch (e) {
    console.log(e);
  }
}
