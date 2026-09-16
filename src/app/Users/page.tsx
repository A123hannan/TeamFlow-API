"use client";

import { FormEvent, useState } from "react";

import { useUsers } from "@/src/hooks/useUsers";

export default function UserPage() {
  const { users, loading, error, addUser } = useUsers();

  const [name, setName] = useState("");

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !username || !email) {
      return;
    }

    await addUser({
      name,
      username,
      email,
      phone,
    });

    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
  };

  return (
    <main>
      <h1>Users</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />

        <input
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          value={email}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <button type="submit" className="cursor-pointer">
          Create User
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && users.length === 0 && <p>No users found.</p>}

      {!loading &&
        users.length > 0 &&
        users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        ))}
    </main>
  );
}
