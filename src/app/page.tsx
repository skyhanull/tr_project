"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
export default function Main() {
  const route = useRouter();

  const ClickHandler = () => {
    route.push("/about");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="justify-center flex">
        <Button
          disableElevation
          className="bg-rose-300 text-4xl font-blod p-7 w-80 rounded-full mt-52 text-white "
          onClick={ClickHandler}
        >
          시작하기
        </Button>
      </div>
    </main>
  );
}
