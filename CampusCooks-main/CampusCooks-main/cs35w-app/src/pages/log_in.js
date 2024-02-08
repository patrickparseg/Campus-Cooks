import LoginForm from '../components/LoginForm';
import AuthDetails from '../components/AuthDetails';

const Login = () => {
  return (
    <div className="card-center">
      <LoginForm text='Login Here!' />
      <AuthDetails />
    </div>
  );
};


export default Login;