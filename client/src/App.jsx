import { useEffect, useState } from 'react'
import { Box, Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from '@mui/material';

function BusinessList() {
  const sampleBusinesses = [
    { name: 'Boba Guys', url: "", address: '122 Albright Wy, Los Gatos, CA 95032', distance: '100', rating: 4.5 },
    { name: 'Tea & Boba', url: "", address: '126 Albright Wy, Los Gatos, CA 95032', distance: '500', rating: 4.0 },
    { name: 'Boba Bliss', url: "", address: '283 Albright Wy, Los Gatos, CA 95032', distance: '2000', rating: 4.8 },
    { name: 'Boba Guys', url: "", address: '122 Albright Wy, Los Gatos, CA 95032', distance: '100', rating: 4.5 },
    { name: 'Tea & Boba', url: "", address: '126 Albright Wy, Los Gatos, CA 95032', distance: '500', rating: 4.0 },
    { name: 'Boba Bliss', url: "", address: '283 Albright Wy, Los Gatos, CA 95032', distance: '2000', rating: 4.8 },
    { name: 'Boba Guys', url: "", address: '122 Albright Wy, Los Gatos, CA 95032', distance: '100', rating: 4.5 },
    { name: 'Tea & Boba', url: "", address: '126 Albright Wy, Los Gatos, CA 95032', distance: '500', rating: 4.0 },
    { name: 'Boba Bliss', url: "", address: '283 Albright Wy, Los Gatos, CA 95032', distance: '2000', rating: 4.8 },
    { name: 'Boba Guys', url: "", address: '122 Albright Wy, Los Gatos, CA 95032', distance: '100', rating: 4.5 },
    { name: 'Tea & Boba', url: "", address: '126 Albright Wy, Los Gatos, CA 95032', distance: '500', rating: 4.0 },
    { name: 'Boba Bliss', url: "", address: '283 Albright Wy, Los Gatos, CA 95032', distance: '2000', rating: 4.8 },
    { name: 'Boba Guys', url: "", address: '122 Albright Wy, Los Gatos, CA 95032', distance: '100', rating: 4.5 },
    { name: 'Tea & Boba', url: "", address: '126 Albright Wy, Los Gatos, CA 95032', distance: '500', rating: 4.0 },
    { name: 'Boba Bliss', url: "", address: '283 Albright Wy, Los Gatos, CA 95032', distance: '2000', rating: 4.8 },
  ];

  // Data state variables
  const [location, setLocation] = useState('121 Albright Wy, Los Gatos, CA 95032');
  const [offset, setOffset] = useState(0);
  const [businesses, setBusinesses] = useState(sampleBusinesses);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/yelp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, offset }),
      });
      const data = await response.json();
      setBusinesses(data);
    } catch (err) {
      setError(err);
      console.error('Failed to fetch businesses:', err);
    }
    setLoading(false);
  };

  // UI state variables
  const [orderBy, setOrderBy] = useState('distance');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10; // Number of rows that fit neatly on 1728x882 screen

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const sortComparator = (a, b) => {
    if (orderBy === 'distance' || orderBy === 'rating') {
      return order === 'asc'
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    }
    return 0;
  };

  const sortedRows = [...businesses].sort(sortComparator);
  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
      fetch('http://localhost:3000/')
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: 'center', marginTop: 4, marginBottom: 2, fontWeight: 'bold', color: 'primary.main' }}>
        Break time? Here's some boba places to try!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Button variant="contained" onClick={fetchBusinesses}>
          Search
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell sortDirection={orderBy === 'distance' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'distance'}
                  direction={orderBy === 'distance' ? order : 'asc'}
                  onClick={() => handleRequestSort('distance')}
                >
                  Distance (m)
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'rating' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'rating'}
                  direction={orderBy === 'rating' ? order : 'asc'}
                  onClick={() => handleRequestSort('rating')}
                >
                  Rating
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((business, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href={business.url} target="_blank" rel="noopener noreferrer" underline="hover" variant="body1">{business.name}</Link>
                </TableCell>
                <TableCell>{business.address}</TableCell>
                <TableCell>{business.distance}m</TableCell>
                <TableCell>⭐ {business.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={businesses.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>
    </>
  );
}

export default BusinessList
