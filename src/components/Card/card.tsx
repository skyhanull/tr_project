import { useState } from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DetailModal from "../Modal/detailModal";

export default function RecipeReviewCard({
  cardData,
  setPagination,
  pagination,
  loading,
  state,
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
    <div>
      <div className="flex flex-wrap gap-12 p-8 ml-12">
        {loading
          ? [...Array(12)].map((_, i) => (
              <div key={`skeleton-${i}`} className="rounded-lg w-64">
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
                    }
                    title={
                      <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
                    }
                    subheader={
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                    }
                  />
                  <div className="h-40 bg-gray-300 animate-pulse" />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <span className="h-4 bg-gray-300 rounded animate-pulse" />
                      <span className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <span className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
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
                <Card sx={{ maxWidth: 345 }} className="text-overflow-ellipsis">
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {session?.user?.name?.[0]}
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
                    <div className="relative w-full h-40 overflow-hidden">
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
                    <span className="line-clamp-2">
                      {card.roads.map((road: any, i: number) => (
                        <span key={`road-card-${i}`}>
                          <span>{road.name} -</span>
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
          state={state}
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
