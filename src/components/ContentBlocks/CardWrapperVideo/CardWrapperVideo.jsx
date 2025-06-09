import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from '@mui/material';


const fetchVideoTitle = async (videoId) => {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyA-9LylV3H1bJfomBeSzgsNqVM_GHYAAtk&part=snippet`);
  const data = await response.json();
  if (data.items && data.items[0]) {
    return data.items[0].snippet.title;
  } else {
    console.error('No video found for this ID:', videoId);
    return '';
  }
}

const CardWrapperVideo = ({item}) => {
  // item.url = "https://www.youtube.com/watch?v=Y1_VsyLAGuk&list=RDGMEMYH9CUrFO7CfLJpaD7UR85wVMX35Mi9Z1ZfI&index=2";
  const videoId = new URL(item.url).searchParams.get("v");
  
  const [title, setTitle] = useState("");

  const theme = useTheme();
  const matches1100 = useMediaQuery(theme.breakpoints.down('leftBar'));
  const matches900 = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchVideoTitle(videoId).then(setTitle);
  }, [videoId]);
  
  return (
    <Card sx={{ width: "100%", padding: matches900 ? "5px" : "10px", border: "1px solid", borderColor: "cardWrapper.border" }}>
      <Box sx={{height: "auto", overflow: "hidden", paddingTop: "56.25%", position: "relative"}}>
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}`} 
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}
          loading="lazy"
        />
      </Box>
      <Box sx={{paddingTop: "5px"}}>
        <Typography color="text.secondary" sx={{fontSize: matches1100 ? "10px" : "14px", fontWeight: 700}}>
          {title}
        </Typography>
      </Box>
    </Card>
  );
}
export default CardWrapperVideo;