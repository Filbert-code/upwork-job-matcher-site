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
import { Dispatch, SetStateAction } from "react";
import { convertTimeToTimeSince } from "../helper_functions";

type SubscriptionCardProps = {
  data: Record<string, AttributeValue>;
  setViewMatches: (index: number) => void;
  index: number;
};

export default function SubscriptionCard({
  data,
  setViewMatches,
  index,
}: SubscriptionCardProps) {
  const name = data.name.S;
  const keywords = data.keywords.L;
  const keywords_weights = data.keyword_weights.L;
  const results = data.results.L!!;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ maxWidth: 450 }}>
        <Typography
          variant="h3"
          color="black"
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
            results.reverse().map((result, i) => (
              <Stack direction="row" spacing={0.5}>
                <Typography
                  variant="body1"
                  bgcolor="blue"
                  borderRadius={2}
                  padding={1}
                  color="white"
                  key={i}
                  width="80%"
                >
                  {result.M!!.job_data.M!!.title.S}
                </Typography>
                <Box
                  textAlign="left"
                  padding={1}
                  width="20%"
                  bgcolor="lightcoral"
                  borderRadius={2}
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
        <Link href={""}>
          <Button
            size="large"
            variant="contained"
            onClick={() => setViewMatches(index)}
          >
            View Matches
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}