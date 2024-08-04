// const LocationItem = React.memo(({ el, locationHandler, toggleCollapse, backgroundColorClass }) => (
//   <div className="h-full rounded-xl p-5 flex flex-col border-b overflow-auto">
//     <div className="flex-row mb-2 text-xl" onClick={() => toggleCollapse(el.place_url)}>
//       {el.place_name}
//       <Chip
//         label={el.category_group_name}
//         sx={{ backgroundColorClass, color: backgroundColorClass }}
//         variant="outlined"
//         className="ml-3 text-xs"
//       />
//     </div>
//     <div className="flex flex-row">
//       <Image
//         src={getImageSrc(el.category_group_code)}
//         alt=""
//         layout="fixed"
//         width={70}
//         height={90}
//         objectFit="cover"
//         className="rounded-lg shadow-xl"
//       />
//       <div className="flex ml-8 flex-row justify-between w-full">
//         <div>
//           <span className="flex m-0 p-0 flex-row">
//             {el?.category_name?.split(" > ").slice(0, 3).map((category, i) => (
//               <Chip key={i} label={category} size="small" className="m-1 text-xs" />
//             ))}
//           </span>
//           <div className="mt-2 text-sm mr-1 min-h-10">{el.road_address_name}</div>
//         </div>
//         <div>
//           <Button
//             className="h-full bg-red-100 text-zinc-700 p-4"
//             onClick={() =>
//               locationHandler(
//                 el.x,
//                 el.y,
//                 el.place_name,
//                 el.road_address_name,
//                 el.category_group_name
//               )
//             }
//           >
//             <HiOutlinePlus className="text-2xl" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   </div>
// ));
