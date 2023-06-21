import { useState } from "react";

// Objeto com informações dos usuários
const users = [
  { username: "antonio", password: "123456" },
  { username: "usuario2", password: "senha2" },
  { username: "usuario3", password: "senha3" },
];

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = users.find((user) => user.username === username);
    if (user && user.password === password) {
      // Login válido
      alert("Login válido");
    } else {
      // Login inválido
      alert("Login inválido");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}