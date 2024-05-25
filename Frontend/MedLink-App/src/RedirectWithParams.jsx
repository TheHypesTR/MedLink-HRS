import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RedirectWithParams = () => {
  const { userid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/PasswordForgot?userid=${userid}&token=${token}`);
  }, [userid, token, navigate]);

  return null;
};

export default RedirectWithParams;
