import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Button, Grid, Stack } from "@mui/material";
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import {
  AttributeValue,
  DynamoDBClient,
  ListTablesCommand,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import SubscriptionCard from "@/lib/components/subscription_card";
import JobMatchCard from "@/lib/components/job_match_card";
import { useState } from "react";
import NavBar from "@/lib/components/navbar";
import { ddb_client } from "@/lib/clients/dynamodb_client";

export default function Home({
  subscriptions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      maxWidth={1500}
      margin="auto"
    >
      <NavBar showBackButton={false} />
      <Stack direction={{ sm: "column", md: "row" }} spacing={{ sm: 2, md: 4 }}>
        {subscriptions.subscriptions.map((subscription, i) => {
          return <SubscriptionCard key={i} data={subscription} index={i} />;
        })}
      </Stack>
    </Box>
  );
}

type Data = {
  subscriptions: Record<string, AttributeValue>[];
};

export const getServerSideProps: GetServerSideProps<{
  subscriptions: Data;
}> = async (context) => {
  const user_keywords_subscriptions_table = "upwork-user-keywords-table";

  const client = ddb_client;
  const command_input: ScanCommandInput = {
    TableName: user_keywords_subscriptions_table,
  };
  const command = new ScanCommand(command_input);
  const response = await client.send(command);
  const subscriptions = { subscriptions: response.Items!! };
  return {
    props: {
      subscriptions,
    },
  };
};
