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

export default function Home({
  subscriptions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [viewMatches, setViewMatches] = useState(false);
  const [viewMatchesIndex, setViewMatchesIndex] = useState(0);

  function handleSetViewMatches(index: number) {
    console.log("index: " + index);
    setViewMatchesIndex(index);
    setViewMatches(true);
  }

  return (
    <Box
      display="flex"
      bgcolor={"navy"}
      width="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      maxWidth={1500}
      margin="auto"
    >
      <NavBar viewMatches={viewMatches} setViewMatches={setViewMatches} />
      <Button
        variant="contained"
        size="large"
        sx={{ fontSize: "30px" }}
        onClick={() => console.log(subscriptions)}
      >
        Get Data from Database
      </Button>
      {!!!viewMatches ? (
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={{ sm: 2, md: 4 }}
        >
          {subscriptions.subscriptions.map((subscription, i) => {
            return (
              <SubscriptionCard
                key={i}
                data={subscription}
                setViewMatches={handleSetViewMatches}
                index={i}
              />
            );
          })}
        </Stack>
      ) : (
        <Stack spacing={{ xs: 2, sm: 2, md: 4 }} width="100%">
          {subscriptions.subscriptions
            .reverse()
            [viewMatchesIndex].results.L!!.reverse()
            .map((match, i) => {
              return <JobMatchCard key={i} attribute_data={match} />;
            })}
        </Stack>
      )}
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

  const client = new DynamoDBClient({
    region: "us-west-2",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY!!,
      secretAccessKey: process.env.SECRET_KEY!!,
    },
  });
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
