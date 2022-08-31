import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const naviagte = useNavigate();
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

    if (password !== password2) {
      alert("password dose not macth");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      naviagte("/dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, naviagte, message, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <div style={{ marginBottom: 10 }}>Register</div>
        <div>
          <form onSubmit={onSubmit}>
            <div style={{ marginBottom: 10 }}>
              <div>Name</div>
              <input
                type="text"
                value={name}
                id="name"
                name="name"
                placeholder="Please enter name"
                onChange={onChange}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <div>Email</div>
              <input
                type="email"
                value={email}
                name="email"
                id="email"
                placeholder="Please enter email"
                onChange={onChange}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <div>Password</div>
              <input
                type="password"
                value={password}
                id="password"
                name="password"
                placeholder="Please enter password"
                onChange={onChange}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <div>Confirm Password</div>
              <input
                type="password2"
                value={password2}
                name="password2"
                id="password2"
                placeholder="Please confirm password"
                onChange={onChange}
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <button type="submit"> Register</button>
            </div>
          </form>
        </div>
        <div>
          Already Registerd ? <Link to="/login"> Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
