import Image from "next/image";
// import { useSelector } from "react-redux";
import Header from "@/src/components/dashboardComponets/header/page";
export default function Home() {
  // const users = useSelector((state: any) => state.users.users);
  return (
    <div className="flex flex-col ">
      <Header />
    </div>
  );
}
