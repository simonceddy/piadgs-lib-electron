import { useLocation } from 'react-router-dom';

export default function useQuery() {
  // console.log(useLocation());
  return new URLSearchParams(useLocation().search);
}
