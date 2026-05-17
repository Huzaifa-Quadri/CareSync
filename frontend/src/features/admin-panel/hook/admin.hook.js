import { useContext } from "react";
import { AdminContext } from "../context/admin.context";

export const useAdmin = () => useContext(AdminContext);
