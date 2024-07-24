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
          className="bg-customPink text-5xl font-blod p-10 w-96 rounded-full mt-52 text-black "
          onClick={ClickHandler}
        >
          시작하기
        </Button>
      </div>
    </main>
  );
}
