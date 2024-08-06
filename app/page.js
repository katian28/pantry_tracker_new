"use client";

import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";

// Define a custom theme with purple colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#6a1b9a", // Purple
    },
    secondary: {
      main: "#ab47bc", // Lighter Purple
    },
    background: {
      default: "#f3e5f5", // Light Purple Background
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 700,
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff", // White background
  border: "2px solid #6a1b9a", // Purple border
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" color={theme.palette.primary.main}>
              Add Item
            </Typography>
            <Stack width="100%" direction={"row"} spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  addItem(itemName);
                  setItemName("");
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Item
        </Button>
        <Box border={"1px solid #6a1b9a"} borderRadius={2}>
          <Box
            width="800px"
            height="70px"
            bgcolor={"#6a1b9a"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              variant={"h4"}
              color={"#ffffff"} // White text
              textAlign={"center"}
            >
              Inventory Items
            </Typography>
          </Box>
          <TableContainer
            component={Paper}
            sx={{ width: "800px", minHeight: "300px", overflow: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" color={theme.palette.primary.main}>
                      Product Name
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" color={theme.palette.primary.main}>
                      Quantity
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" color={theme.palette.primary.main}>
                      Operations
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventory.map(({ name, quantity }) => (
                  <TableRow key={name}>
                    <TableCell>
                      <Typography variant="h6">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6"> {quantity}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => addItem(name)}
                        sx={{ mr: 1 }}
                      >
                        Add
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeItem(name)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
