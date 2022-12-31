export const API_CONFIG = {
  base: "/",
  baseURL: `${import.meta.env.VITE_API_ENCRYPTION}://${
    import.meta.env.VITE_API_IP
  }:${import.meta.env.VITE_API_PORT}${
    { development: "/", production: "/" }[import.meta.env.MODE]
  }`,
  geoLocationAPI:
    "https://geolocation.onetrust.com/cookieconsentpub/v1",
};
