import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
      fetch('http://localhost:3000/')
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' , bgcolor: 'background.default'}}>
      <Typography variant="h1" color="primary">
        Break time? Here's some boba options to sample!
      </Typography>
    </Box>
  )
}

export default App
