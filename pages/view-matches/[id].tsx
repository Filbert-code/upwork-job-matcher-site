import { ddb_client } from "@/lib/clients/dynamodb_client";
import JobMatchCard from "@/lib/components/job_match_card";
import NavBar from "@/lib/components/navbar";
import {
  AttributeValue,
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import { Box, Stack } from "@mui/material";
import { Key } from "react";

export default function ViewMatches({ data }: any) {
  console.log(data);
  const results = data.results.L!!.reverse();
  return (
    <Box maxWidth={1500}>
      <NavBar showBackButton={true} />
      <Stack spacing={{ xs: 2, sm: 2, md: 4 }} width="100%">
        {results.map((match: AttributeValue, i: Key | null | undefined) => {
          return <JobMatchCard key={i} attribute_data={match} />;
        })}
      </Stack>
    </Box>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const user_keywords_subscriptions_table = "upwork-user-keywords-table";
  const client = ddb_client;
  const command_input: ScanCommandInput = {
    TableName: user_keywords_subscriptions_table,
    ProjectionExpression: "#pk_name",
    ExpressionAttributeNames: {
      "#pk_name": "name",
    },
  };
  const command = new ScanCommand(command_input);
  const response = await client.send(command);
  const subscriptions = { subscriptions: response.Items!! };
  const paths = subscriptions.subscriptions.map((subscription) => ({
    params: { id: subscription.name.S!! },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // Fetch necessary data for the blog post using params.id
  const user_keywords_subscriptions_table = "upwork-user-keywords-table";
  const client = ddb_client;
  const input = {
    TableName: user_keywords_subscriptions_table,
    KeyConditionExpression: "#pk_name = :sub_name",
    ExpressionAttributeValues: {
      ":sub_name": { S: params.id },
    },
    ExpressionAttributeNames: {
      "#pk_name": "name",
    },
  };
  const command = new QueryCommand(input);
  const response = await client.send(command);
  const data = response.Items!![0];
  return {
    props: {
      data,
    },
  };
}
