import React from 'react'
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  
});
const Dashboard = () => {
  return (
    <MantineProvider theme={theme}>
      
    </MantineProvider>
  )
}

export default Dashboard