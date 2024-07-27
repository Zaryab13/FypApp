import { useSelector, useDispatch } from 'react-redux';

const useAuth = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  return { state, dispatch };
};

export default useAuth;
