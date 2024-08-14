"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { red } from "@mui/material/colors";
import DetailModal from "../Modal/detailModal";

export default function RecipeReviewCard({
  cardData,
  setPagination,
  pagination,
  loading, // 로딩 상태 추가
}: any) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const ClickHandler = (card: any) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPagination((prev: any) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-12 p-8 ml-12">
        {loading // 로딩 중일 때 스켈레톤 표시
          ? [...Array(12)].map((_, i) => (
              <div key={`skeleton-${i}`} className="rounded-lg w-64">
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Skeleton variant="circular" width={40} height={40} />
                    }
                    title={<Skeleton width="80%" />}
                    subheader={<Skeleton width="40%" />}
                  />
                  <Skeleton variant="rectangular" height={150} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <Skeleton width="100%" />
                      <Skeleton width="80%" />
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Skeleton width="30%" />
                  </CardActions>
                </Card>
              </div>
            ))
          : cardData?.map((card: any, i: number) => (
              <div
                key={`card-${i}`}
                onClick={() => ClickHandler(card)}
                className="rounded-lg w-64 border-2 shadow-xl h-76"
              >
                <Card sx={{ maxWidth: 345 }} className="text-overflow-elipsis">
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {session?.user?.name?.split("")[0]}
                      </Avatar>
                    }
                    title={
                      <span className="block text-ellipsis overflow-hidden whitespace-nowrap">
                        {card.listName}
                      </span>
                    }
                    subheader={
                      <span className="block text-ellipsis overflow-hidden whitespace-nowrap">
                        {card.date}
                      </span>
                    }
                  />

                  {card.image ? (
                    <div className="relative w-full h-40 overflow-hidden ">
                      <Image
                        src={card.image}
                        alt="img"
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                        priority
                      />
                    </div>
                  ) : (
                    <div className="h-40 w-64 bg-rose-50" />
                  )}

                  <CardContent className="h-20">
                    <span className=" line-clamp-2">
                      {card.roads.map((road: any, i: number) => (
                        <span key={`road-card-${i}`}>
                          <span className="">{road.name} -</span>
                        </span>
                      ))}
                    </span>
                  </CardContent>
                </Card>
              </div>
            ))}
      </div>
      {isOpen && (
        <DetailModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          card={selectedCard}
          state={false}
        />
      )}
      <Pagination
        count={pagination.totalPages}
        page={pagination.page}
        onChange={handlePageChange}
        variant="outlined"
        className="p-6 flex justify-center text-pink-500"
      />
    </div>
  );
}
