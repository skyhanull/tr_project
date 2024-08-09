"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { signIn, signOut, useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton"; // Skeleton 컴포넌트 추가
import { red } from "@mui/material/colors";

export default function RecipeReviewCard({
  cardData,
  setPagination,
  pagination,
  loading, // 로딩 상태 추가
}: any) {
  const { data: session } = useSession();
  const route = useRouter();

  const ClickHandler = (code: string) => {
    if (code === session?.user?.code) {
      route.push(`/chatting/${code}`);
    } else {
      console.log("Not authorized to access this page");
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="h-screen">
      <div className="flex flex-wrap gap-12 p-8 ml-12">
        {loading // 로딩 중일 때 스켈레톤 표시
          ? [...Array(10)].map((_, i) => (
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
                onClick={() => ClickHandler(card.userCode)}
                className="rounded-lg w-64"
              >
                <Card sx={{ maxWidth: 345 }} className="text-overflow-elipsis">
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {session?.user?.name?.split("")[0]}
                      </Avatar>
                    }
                    title={card.listName}
                    subheader={card.date}
                  />
                  <div className="h-40 w-64 bg-slate-400" />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <span className=" line-clamp-2">
                        {card.roads.map((road: any, i: number) => (
                          <span key={`road-card-${i}`} className="">
                            <span className="">{road.name} -</span>
                          </span>
                        ))}
                      </span>
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing></CardActions>
                </Card>
              </div>
            ))}
      </div>
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
