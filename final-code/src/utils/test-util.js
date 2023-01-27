import { cepData } from "../mock/cepData";
import { isbnData } from "../mock/isbnData";
import { ncmData } from "../mock/ncmData";

const NMC_API_ENDPOINT = 'https://brasilapi.com.br/api/ncm/v1';
const ISBN_API_PREFIX = 'https://brasilapi.com.br/api/isbn/v1';
const CEP_API_PREFIX = 'https://brasilapi.com.br/api/cep/v2';

export const mockFetch = async (url) => {
  return {
    json: async () => {
      if (url.includes(NMC_API_ENDPOINT)) {
        return ncmData;
      }
      if (url.includes(ISBN_API_PREFIX)) {
        return isbnData;
      }
      if (url.includes(CEP_API_PREFIX)) {
        return cepData;
      }
    }
  }
};
