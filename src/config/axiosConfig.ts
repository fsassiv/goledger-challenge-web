import axios from 'axios';
import base64 from 'base-64';

const username = process.env.API_USERNAME;
const password = process.env.API_PASSWORD;
const token = base64.encode(`${username}:${password}`);

export const appAxios = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 1000,
  headers: {
    Authorization: `Basic ${token}`,
    'Content-Type': 'application/json',
  },
});

export enum API_ENDPOINTS {
  GET_HEADER = '/query/getHeader',
  GET_TX = '/query/getTx',
  GET_SCHEMA = '/query/getSchema',
  SEARCH = '/query/search',
  READ_ASSET_HISTORY = '/query/readAssetHistory',
  READ_ASSET = '/query/readAsset',
  CREATE_ASSET = '/invoke/createAsset',
  UPDATE_ASSET = '/invoke/updateAsset',
  DELETE_ASSET = '/invoke/deleteAsset',
}
