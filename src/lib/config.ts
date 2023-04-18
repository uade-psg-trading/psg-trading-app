import { PUBLIC_API_URL } from '$env/static/public';

export const getEndpoints = () => {
  return {
    api: PUBLIC_API_URL || 'http://localhost:8000'
  };
};

console.log(getEndpoints());
