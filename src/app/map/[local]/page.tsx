import KaKaoMap from "../../../components/kakao/kakaomap";
import Menu from "./mapCilent";

export default function MapList({}: // users: React.ReactNode;
{
  params: { productId: string };
  searchParams: { country: string };
}) {
  return (
    <div className="flex h-screen flex-row w-screen p-0">
      <Menu />
      <KaKaoMap />
    </div>
  );
}
