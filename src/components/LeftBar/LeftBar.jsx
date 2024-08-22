import React, { useContext } from 'react';
import { RootStoreContext } from '../../store/RootStoreProvider';
import Box from '@mui/material/Box';

import BlockWelcome from './BlockWelcome/BlockWelcome';
import BlockSocials from './BlockSocials/BlockSocials';
import BlockInfoSimple from './BlockInfoSimple/BlockInfoSimple';
import CatalogList from '../CatalogList/CatalogList';

import { observer } from 'mobx-react-lite';

import { styled } from '@mui/system';

const LeftBar = observer(() => {
  
  const { userStore, infoUserBlocksStore} = useContext(RootStoreContext);

  const CustomScrollbarBox = styled(Box)({
    // overflowY: 'scroll',
    // '&::-webkit-scrollbar': {
    //   width: '12px',
    // },
    // '&::-webkit-scrollbar-track': {
    //   background: 'transparent',
    // },
    // '&::-webkit-scrollbar-thumb': {
    //   background: '#888',
    //   borderRadius: '6px',
    // },
    // '&::-webkit-scrollbar-thumb:hover': {
    //   background: '#555',
    // },
    overflowY: 'scroll',
    scrollbarWidth: 'none', /* For Firefox */
    msOverflowStyle: 'none', /* For Internet Explorer and Edge */
    '&::-webkit-scrollbar': {
      width: '0px', /* For Chrome, Safari, and Opera */
    },
  });

  return (  
    <Box sx={{display: "flex", width: "100%", height: "100%", backgroundColor: "primary.main"}}>
      {/*For flex-end <Box sx={{display: "flex", flexDirection: "column", gap: "20px", alignSelf: "flex-end", position: "sticky", bottom: "0px"}}> */}
      <CustomScrollbarBox sx={{ 
        display: "flex", 
        flexDirection: "column",
        paddingTop: "20px",
        gap: "20px", 
        position: "sticky", 
        top: "64px", 
        maxHeight: "100vh", 
        overflowY: "auto",
      }}>
        <CatalogList />

        {userStore.isAuth ? null : <BlockWelcome />}

        <BlockSocials />

        <BlockInfoSimple blockTitle="Information about the company" data={infoUserBlocksStore.blockAboutCompanyData} />
          
        <BlockInfoSimple blockTitle="Help" data={infoUserBlocksStore.blockHelpData} />
        <BlockInfoSimple blockTitle="Help" data={infoUserBlocksStore.blockHelpData} />
        <BlockInfoSimple blockTitle="Help" data={infoUserBlocksStore.blockHelpData} />
        
      </CustomScrollbarBox>
    </Box>
  );
});

export default LeftBar