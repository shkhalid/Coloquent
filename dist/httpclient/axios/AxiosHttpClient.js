"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const AxiosHttpClientPromise_1 = require("./AxiosHttpClientPromise");
class AxiosHttpClient {
    constructor(axiosInstance) {
        if (axiosInstance === null || axiosInstance === undefined) {
            axiosInstance = axios_1.default.create();
            axiosInstance.defaults.headers['Accept'] = 'application/vnd.api+json';
            axiosInstance.defaults.headers['Content-type'] = 'application/vnd.api+json';
        }
        this.axiosInstance = axiosInstance;
    }
    setBaseUrl(baseUrl) {
        this.axiosInstance.defaults.baseURL = baseUrl;
    }
    setWithCredentials(withCredientials) {
        this.axiosInstance.defaults.withCredentials = withCredientials;
    }
    get(url) {
        return new AxiosHttpClientPromise_1.AxiosHttpClientPromise(this.axiosInstance.get(url));
    }
    delete(url) {
        return new AxiosHttpClientPromise_1.AxiosHttpClientPromise(this.axiosInstance.delete(url));
    }
    head(url) {
        return new AxiosHttpClientPromise_1.AxiosHttpClientPromise(this.axiosInstance.head(url));
    }
    post(url, data) {
        return new AxiosHttpClientPromise_1.AxiosHttpClientPromise(this.axiosInstance.post(url, data));
    }
    put(url, data) {
        return new AxiosHttpClientPromise_1.AxiosHttpClientPromise(this.axiosInstance.put(url, data));
    }
    patch(url, data) {
        return new AxiosHttpClientPromise_1.AxiosHttpClientPromise(this.axiosInstance.patch(url, data));
    }
    getImplementingClient() {
        return this.axiosInstance;
    }
}
exports.AxiosHttpClient = AxiosHttpClient;
//# sourceMappingURL=AxiosHttpClient.js.map