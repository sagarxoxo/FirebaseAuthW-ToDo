import React, { useState } from "react";
import UserContext from "./UseContext";

export default function UserState({ children }) {
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
