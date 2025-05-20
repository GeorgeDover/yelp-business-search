import { useEffect } from 'react'
import { Paper, Link, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

function BusinessList() {
  const businesses = [
    { name: 'Boba Guys', url: "", address: '122 Albright Wy, Los Gatos, CA 95032', distance: '100m', rating: 4.5 },
    { name: 'Tea & Boba', url: "", address: '126 Albright Wy, Los Gatos, CA 95032', distance: '500m', rating: 4.0 },
    { name: 'Boba Bliss', url: "", address: '283 Albright Wy, Los Gatos, CA 95032', distance: '2000m', rating: 4.8 },
  ];

  useEffect(() => {
      fetch('http://localhost:3000/')
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: 'center', marginTop: 4, marginBottom: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Break time? Here's some boba places to try!
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: '0 auto' }}>
        <Table>
          <TableBody>
            {businesses.map((business, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href={business.url} target="_blank" rel="noopener noreferrer" underline="hover" variant="body1">{business.name}</Link>
                </TableCell>
                <TableCell>{business.address}</TableCell>
                <TableCell>{business.distance}</TableCell>
                <TableCell>⭐ {business.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BusinessList
