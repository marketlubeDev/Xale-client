import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from "../../../global/authSlice";

export default function AuthRedirect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      dispatch(setToken(token));

      // ✅ redirect after login
      navigate("/dashboard", { replace: true });
    } else {
      // ❌ no token → back to login
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate, searchParams]);

  return null; // no UI needed
}
