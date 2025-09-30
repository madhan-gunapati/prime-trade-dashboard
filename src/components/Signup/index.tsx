import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [errorVisible, setErrorVisible] = useState(false)
  const [passwordVisible, setPasswordVisibility] = useState(false)
  const navigate = useNavigate()

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const CreateUser = async () => {
    const url = "http://localhost:3000/create-user"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
        Authorization: "Bearer ",
      },
      body: JSON.stringify({ username, password, email }),
    }
    const server_result = await fetch(url, options)
    if (server_result.ok) {
      console.log("successful")
      navigate("/login")
    } else {
      setErrorVisible(true)
      setError(`Error: ${server_result.statusText}`)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create Account of Prime Trade 
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter Name"
            value={username}
            onChange={changeUsername}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="Email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="Email"
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
          onClick={CreateUser}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Create User
        </button>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-medium text-blue-600 hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default Signup
