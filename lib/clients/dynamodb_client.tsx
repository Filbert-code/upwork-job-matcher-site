import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const ddb_client = new DynamoDBClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!!,
    secretAccessKey: process.env.SECRET_KEY!!,
  },
});
