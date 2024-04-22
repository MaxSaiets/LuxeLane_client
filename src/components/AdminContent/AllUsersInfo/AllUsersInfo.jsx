import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AllUsersInfoGrid from '../Grid/AllUsersInfoGrid/AllUsersInfoGrid';
import ColumnChart from '../Charts/ColumnChart/ColumnChart';
import { Grid } from '@mui/material';
import { fetchAllUsers } from '../../../http/usersApi';

const AllUsersInfo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllUsers().then(users => setData(users));
  }, []);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <AllUsersInfoGrid data={data} updateData={fetchAllUsers} />
      </Grid>
      
      <Grid item xs={12}>
        <Box sx={{width: "100%", height: "500px"}}>
          <ColumnChart data={data} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default AllUsersInfo;