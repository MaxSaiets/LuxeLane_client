import React, { useContext } from 'react';
import { UserStoreContext, InfoUserBlocksStoreContext } from "../../index";

import Box from '@mui/material/Box';

import BlockWelcome from './BlockWelcome/BlockWelcome';
import BlockSocials from './BlockSocials/BlockSocials';
import BlockInfoSimple from './BlockInfoSimple/BlockInfoSimple';
import CatalogList from '../CatalogList/CatalogList';

import { observer } from 'mobx-react-lite';

const LeftBar = observer(() => {
  
  const user = useContext(UserStoreContext);
  const infoUserBlocks = useContext(InfoUserBlocksStoreContext);

  return (  
    <Box sx={{display: "flex", width: "100%", height: "100%", paddingTop: "20px", backgroundColor: "primary.main"}}>
      <Box sx={{display: "flex", flexDirection: "column", gap: "20px", alignSelf: "flex-end", position: "sticky", bottom: "0px"}}>

        <CatalogList />

        {user.isAuth ? null : <BlockWelcome />}

        <BlockSocials />

        <BlockInfoSimple blockTitle="Information about the company" data={infoUserBlocks.blockAboutCompanyData} />
          
        <BlockInfoSimple blockTitle="Help" data={infoUserBlocks.blockHelpData} />
        
      </Box>
    </Box>
  );
});

export default LeftBar