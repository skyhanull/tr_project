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
import { red } from "@mui/material/colors";

export default function RecipeReviewCard({ cardData }: any) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(cardData);
  return (
    <div>
      {cardData?.map((card: any) => (
        <div key={card.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  Rs
                </Avatar>
              }
              title={card.name}
              subheader={card.address}
            />
            <CardMedia
              component="img"
              height="194"
              image={card.image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {card.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing></CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}
