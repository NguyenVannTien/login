
import axios from "axios";

const onLogin = async () => {
  const res =  await axios.post('api/v1/authenticate/login')
  console.log(res);
}

export default onLogin;