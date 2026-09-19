import Image from "next/image";
// import { useSelector } from "react-redux";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import Component2 from "@/src/components/dashboardComponets/Component2/component2";
import Component3 from "@/src/components/dashboardComponets/Component3/page";
export default function Home() {
  // const users = useSelector((state: any) => state.users.users);
  return (
    <div className="flex flex-col pb-[100px]">
      <Header title="Dashboard" />
      <div className="space-y-6 max-w-7xl w-full mx-auto  px-4 sm:px-6  ">
        <Component1
          heading="Good Morning, Team"
          subheading="Here's what's happening acriss your workspace."
          button={false}
          // buttonText=""
        />
        <Component2 />
        <Component3 />
      </div>
    </div>
  );
}
