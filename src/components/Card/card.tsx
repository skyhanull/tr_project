"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { signIn, signOut, useSession } from "next-auth/react";
import { red } from "@mui/material/colors";

export default function RecipeReviewCard({ cardData }: any) {
  const [expanded, setExpanded] = React.useState(false);
  const { data: session } = useSession();

  return (
    <div className="flex flex-wrap gap-12 p-8 ml-12">
      {cardData?.map((card: any) => (
        <div key={card.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {session?.user?.name?.split("")[0]}
                </Avatar>
              }
              title={card.listName}
              subheader={card.address}
            />
            {/* <CardMedia
              component="img"
              height="194"
              image={card.image}
              alt="Paella dish"
            /> */}
            <div className="h-40 w-60 bg-slate-400" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <div className=" line-clamp-2">
                  {card.roads.map((road: any) => (
                    <span key={road.id} className=" ">
                      <div>{road.name} -</div>
                    </span>
                  ))}
                </div>
              </Typography>
            </CardContent>
            <CardActions disableSpacing></CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}
