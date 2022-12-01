import axios from "axios";
import { API_URL } from "../apiConstant";

export async function handleRemoveItem(id, setItems) {
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
