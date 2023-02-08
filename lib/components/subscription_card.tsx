import { AttributeValue } from "@aws-sdk/client-dynamodb";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { convertTimeToTimeSince } from "../helper_functions";

type SubscriptionCardProps = {
  data: Record<string, AttributeValue>;
  index: number;
};

export default function SubscriptionCard({
  data,
  index,
}: SubscriptionCardProps) {
  const name = data.name.S;
  const keywords = data.keywords.L;
  const keywords_weights = data.keyword_weights.L;
  const results = [...data.results.L!!].reverse();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "primary.main",
      }}
    >
      <CardContent sx={{ maxWidth: 450 }}>
        <Typography
          variant="h3"
          color="mint.main"
          marginBottom={2}
          textAlign="center"
        >
          {name}
        </Typography>
        <Stack direction="row" alignItems={"center"} spacing={1}>
          <Typography variant="h5">Keywords</Typography>
          <Typography variant="body1">(weights)</Typography>
        </Stack>
        <Divider sx={{ marginBottom: 1 }} />
        <Typography variant="h6" marginBottom={2}>
          {keywords
            ?.map((keyword, i) => {
              return keyword.S + " (" + keywords_weights?.[i].N + ")";
            })
            .join(", ")}
        </Typography>
        <Typography variant="h5">Matches</Typography>
        <Divider sx={{ marginBottom: 1 }} />
        <Stack spacing={1} textAlign="center">
          {results!!.length > 0 ? (
            results.map((result, i) => (
              <Stack key={i} direction="row" spacing={0.25}>
                <Typography
                  variant="body1"
                  bgcolor="mint.main"
                  padding={1}
                  color="primary.main"
                  key={i}
                  width="80%"
                  sx={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
                >
                  {result.M!!.job_data.M!!.title.S}
                </Typography>
                <Box
                  textAlign="left"
                  padding={1}
                  width="20%"
                  bgcolor="secondary.main"
                  sx={{
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  <Typography variant="body2" key={i} color="white">
                    {convertTimeToTimeSince(
                      result.M!!.job_data.M!!.time_posted.S!!
                    )}
                  </Typography>
                </Box>
              </Stack>
            ))
          ) : (
            <Typography variant="h5">No Matches Yet.</Typography>
          )}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", marginBottom: 1 }}>
        <Link href={`/view-matches/${name}`}>
          <Button size="large" variant="contained" color="secondary">
            View Matches
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
