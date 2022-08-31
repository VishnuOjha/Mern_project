import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, user, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("please add all field");
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      alert(messgae);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  return (
    <div>
      <div>
        <div style={{ marginBottom: 10 }}>Login</div>
        <div>
          <form onSubmit={onSubmit}>
            <div style={{ marginBottom: 10 }}>
              <div>Email</div>
              <input
                type="email"
                id="name"
                value={email}
                onChange={onChange}
                placeholder="Enter email"
                name="email"
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <div>Password</div>
              <input
                type="password"
                value={password}
                name="password"
                placeholder="please enter password"
                onChange={onChange}
                id="password"
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <button type="submit"> Login</button>
            </div>
          </form>
        </div>
        <div>
          Not Registerd ? <Link to="/"> Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
