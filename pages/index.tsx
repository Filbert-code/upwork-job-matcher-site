import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Button } from "@mui/material";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

export default function Home() {
  return (
    <Box
      display="flex"
      bgcolor={"navy"}
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Button variant="contained" size="large" sx={{ fontSize: "30px" }}>
        Get Data from Database
      </Button>
    </Box>
  );
}
