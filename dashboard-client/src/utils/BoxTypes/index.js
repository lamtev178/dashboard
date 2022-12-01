import axios from "axios";
import { API_URL } from "../apiConstant";

export async function getBoxTypes() {
  try {
    const res = await axios({
      method: "get",
      url: `${API_URL}box-types`,
    });
    console.log("box-types =>> ", res.data);
    if (res.status < 400) return res.data;
    return [];
  } catch (e) {
    console.log(e);
  }
}
