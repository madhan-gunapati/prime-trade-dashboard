import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisibility] = useState(false)
  const [error, setError] = useState("")
  const [errorVisible, setErrorVisible] = useState(false)

  const navigate = useNavigate()

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const LoginUser = async () => {
    const url = "http://localhost:3000/login"
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
      },
      body: JSON.stringify({ email, password }),
    }
    const result = await fetch(url, options)
    if (result.ok) {
      const readable_result = await result.json()
      const { token } = readable_result
      localStorage.setItem("jwt_token", token)
      navigate("/")
    } else {
      setErrorVisible(true)
      setError(`Error : ${result.statusText}`)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={changeEmail}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="flex">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={changePassword}
              className="w-full rounded-l-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={() => setPasswordVisibility((p) => !p)}
              className="rounded-r-lg border border-gray-300 bg-gray-100 px-3 text-sm text-gray-600 hover:bg-gray-200"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Error message */}
        {errorVisible && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        {/* Submit */}
        <button
          type="button"
          onClick={LoginUser}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="cursor-pointer font-medium text-blue-600 hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
