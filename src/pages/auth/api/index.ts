import HttpService from '../../../utils/http';
import { LoginReq } from '../model/LoginModel';
import { saveToken, saveAuth } from '../../../utils/jwt';

export const login = async (loginData: LoginReq) => {

  const apiEndpoint = 'login';
  return HttpService.post(apiEndpoint, loginData)
    .then(async (res: any) => {
      if (!res?.data) {
        return;
      }
      const token = res?.data;
      const profile = res?.use;
      if (token) await saveToken(token);
      if (profile) await saveAuth(profile);
      console.log('Repson login', token);
      return res || {};
    })
    .catch(() => {
      return false;
    });
};
