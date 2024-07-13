import Map from "../../../../components/map";
import Bar from "../../../../components/selectBar";
import FilterSelect from "../../../../components/filterbar/fieldSelect";
import SearchBar from "../../../../components/filterbar/search";
import SelectFilter from "../../../../components/filterbar/fieldSelect";

import Image from "next/image";

export default function ProductDetails(props: any) {
  const mapArray = [
    {
      name: "1111",
      id: 1,
      lng: "서울시 강남",
      caption: "여기는 명당입니다 확인",
      tag: "aaudekd",
      img: "/img/seoul.png",
    },
    {
      name: "22222",
      id: 2,
      lng: "서울시 강남",
      caption: "여기는 명당입니다 확인",
      tag: "aaudekd",
      img: "",
    },
    {
      name: "22222",
      id: 2,
      lng: "서울시 강남",
      caption: "여기는 명당입니다 확인",
      tag: "aaudekd",
      img: "",
    },
    {
      name: "22222",
      id: 2,
      lng: "서울시 강남",
      caption: "여기는 명당입니다 확인",
      tag: "aaudekd",
      img: "",
    },
    {
      name: "22222",
      id: 2,
      lng: "서울시 강남",
      caption: "여기는 명당입니다 확인",
      tag: "aaudekd",
      img: "",
    },
  ];
  return (
    <div className="h-full w-4/12 bg-slate-50">
      <SearchBar />
      <SelectFilter />
      {mapArray.map((el) => (
        <>
          <div key={el.id} className=" rounded-xl m-10 flex flex-row">
            <div>
              <Image src={el.img} alt="" width={150} height={150} />
            </div>
            <div className="flex flex-col ml-10">
              <div className="w-56 text-3xl h-10">{el.name}</div>
              <div className="">
                {el.tag}
                {el.caption}
                {el.lng}
              </div>
            </div>
          </div>
          <div className="border-2"></div>
        </>
      ))}
    </div>
  );
}
