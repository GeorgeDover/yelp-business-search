import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Select,
} from "@mui/material";

function BusinessList() {
  // Data state variables
  const [location, setLocation] = useState(
    "121 Albright Wy, Los Gatos, CA 95032"
  );
  const [businesses, setBusinesses] = useState([]);
  // TODO: once mechanism for batch requesting more data is implemented, total should be used instead of businesses.length
  const [total, setTotal] = useState(0);

  const fetchBusinesses = async (offset = 0) => {
    // TODO: add loading state
    try {
      const response = await fetch(
        "http://localhost:3000/api/yelp?location=" +
          encodeURIComponent(location) +
          "&offset=" +
          encodeURIComponent(offset)
      );
      const data = await response.json();

      // Extract only needed info
      const simplifiedData = {
        total: data.total,
        businesses: data.businesses.map((business) => ({
          name: business.name,
          url: business.url,
          distanceMeters: business.distance.toFixed(0),
          distanceMiles: (business.distance * 0.000621371).toFixed(2),
          rating: business.rating.toFixed(1),
        })),
      };

      // If we're fetching from offset 0, it's a new search; otherwise, append results
      if (offset === 0) {
        setBusinesses(simplifiedData.businesses);
      } else {
        setBusinesses((prev) => [...prev, ...simplifiedData.businesses]);
      }

      setTotal(simplifiedData.total);
    } catch (err) {
      console.error("Failed to fetch businesses:", err);
      // TODO: handle error state more gracefully and log details
    }
  };

  // UI state variables
  const [orderBy, setOrderBy] = useState("distance");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10; // Number of rows that fit neatly on 1728x882 screen
  // TODO: make this responsive to screen size

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortComparator = (a, b) => {
    if (orderBy === "distanceMeters" || orderBy === "rating") {
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    }
    return 0;
  };

  const sortedRows = [...businesses].sort(sortComparator);
  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePageChange = async (event, newPage) => {
    const offset = newPage * rowsPerPage;

    // If the new page goes beyond current results and there are more results available, fetch more
    if (offset >= businesses.length && businesses.length < total) {
      await fetchBusinesses(offset);
    }
    setPage(newPage);
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
  };

  const handleButtonPress = () => {
    setPage(0);
    setBusinesses([]); // Clear old results
    fetchBusinesses(0);
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginTop: 4,
          marginBottom: 2,
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        Break time? Here's some boba places to try!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="location-label">Select Location</InputLabel>
          <Select
            labelId="location-label"
            value={location}
            label="Select Location"
            onChange={handleLocationChange}
          >
            <MenuItem value="121 Albright Wy, Los Gatos, CA 95032">
              121 Albright Wy, Los Gatos, CA 95032
            </MenuItem>
            <MenuItem value="888 Broadway, New York, NY 10003">
              888 Broadway, New York, NY 10003
            </MenuItem>
            <MenuItem value="5808 Sunset Blvd, Los Angeles, CA 90028">
              5808 Sunset Blvd, Los Angeles, CA 90028
            </MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleButtonPress}>
          Search
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1000, margin: "0 auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell
                sortDirection={orderBy === "distanceMeters" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "distanceMeters"}
                  direction={orderBy === "distanceMeters" ? order : "asc"}
                  onClick={() => handleRequestSort("distanceMeters")}
                >
                  Distance
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "rating" ? order : false}>
                <TableSortLabel
                  active={orderBy === "rating"}
                  direction={orderBy === "rating" ? order : "asc"}
                  onClick={() => handleRequestSort("rating")}
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
                  <Link
                    href={business.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    variant="body1"
                  >
                    {business.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {business.distanceMiles}mi / {business.distanceMeters}m
                </TableCell>
                <TableCell>⭐ {business.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>
    </>
  );
}

export default BusinessList;
