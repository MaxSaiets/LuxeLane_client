import React, {useContext} from 'react';
import { UserStoreContext, InfoUserBlocksStoreContext } from "../../../index";

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BorderTop from '@mui/icons-material/BorderTop';


import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import BlockSocials from '../../LeftBar/BlockSocials/BlockSocials';
import BlockInfoSimple from '../../LeftBar/BlockInfoSimple/BlockInfoSimple';
import BlockWelcome from '../../LeftBar/BlockWelcome/BlockWelcome';
import { Icon, Typography } from '@mui/material';
import BlockInfoSimpleForDrawer from '../BlockInfoSimpleForDrawer/BlockInfoSimpleForDrawer';


const MyDrawer = ({toggleDrawer}) => {
  const user = useContext(UserStoreContext);
  const infoUserBlocks = useContext(InfoUserBlocksStoreContext);

  return (
    <Box sx={{ width: 250, overflowY: "scroll", "&::-webkit-scrollbar": {width: 0} }} role="presentation" >
      <Box sx={{bgcolor: "background.myDrawer"}}>
        <Box sx={{position: "relative", display: "flex", flexDirection: "row", paddingX: "15px", paddingY: "10px"}}>
          <Box sx={{display: "flex", flexDirection: "row", gap: "5px"}}>
            <BorderTop sx={{ fontSize: 40 }} />

            <Typography variant='h4' sx={{cursor: "default"}}>
              LuxeLane
            </Typography>
          </Box>

          <IconButton onClick={toggleDrawer(false)} sx={{position: "absolute", top: "10px", right: "5px", ":hover": { bgcolor: "background.btnClose" }}}>
            <CloseIcon />
          </IconButton>
        </Box>

        {user.isAuth ? null : <BlockWelcome />}

      </Box>
      <Box sx={{display: "flex", flexDirection: "column", gap: "10px", paddingY: "20px"}}>

        <Box>
          <BlockInfoSimpleForDrawer blockTitle="Information about the company" data={infoUserBlocks.blockAboutCompanyData} toggleDrawer={toggleDrawer} />
          <BlockInfoSimpleForDrawer blockTitle="Help" data={infoUserBlocks.blockHelpData} toggleDrawer={toggleDrawer} />

          <BlockInfoSimpleForDrawer blockTitle="Information about the company" data={infoUserBlocks.blockAboutCompanyData} useAccordion={true} toggleDrawer={toggleDrawer} />
          <BlockInfoSimpleForDrawer blockTitle="Help" data={infoUserBlocks.blockHelpData} useAccordion={true} toggleDrawer={toggleDrawer} />
        </Box>

        <BlockSocials />
      
      </Box>
    </Box>
  );
}
export default MyDrawer;