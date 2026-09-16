import React from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "@/src/redux-toolkit/slices/userslice";
import { AppDispatch } from "@/src/redux-toolkit/store/store";
function AddUser() {
  const [name, setName] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  function handleAddUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(addUsers({ name, username: "", email: "", phone: "" }));
  }
  return (
    <form onSubmit={handleAddUser}>
      <input
        type="text"
        placeholder="Enter Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
}

export default AddUser;
