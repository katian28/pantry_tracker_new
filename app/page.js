"use client";

import Image from "next/image";
import { useState } from "react";
import { firestore } from "@/firebase";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Typography variant= 'h1'> Inventory Management</Typography>
    </Box>
  );
}
