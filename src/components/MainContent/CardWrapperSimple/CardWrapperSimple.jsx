import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import img from "../AdsImg/1.jpg"
import img5 from "../5.jpg"
import { Box } from "@mui/material";

const CardWrapperSimple = ({item}) => {
  return (
    <Card sx={{ width: "19%", padding: "16px", border: "1px solid", borderColor: "cardWrapper.border" }}>
      <CardMedia
        component="img"
        // height="194" 
        height="auto"
        image={img5}
        sx={{objectFit: "contain"}}
        // alt="Paella dish"
      />
      <Box sx={{paddingTop: "16px"}}>
        
        <Typography color="text.secondary" sx={{fontSize: "14px"}}>
          {item.title}
        </Typography>
        <Typography color="text.secondary" sx={{fontSize: "14px", textDecoration: "line-through"}}>
          {item.discount}
        </Typography>

        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography color="text.secondary" sx={{fontSize: "24px"}}>
            {item.price}
          </Typography>

          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Box>

      </Box>
    </Card>
  );
}
export default CardWrapperSimple;