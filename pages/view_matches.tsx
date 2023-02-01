import JobMatchCard from "@/lib/components/job_match_card";
import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { Box, Stack } from "@mui/material";

type ViewMatchesProps = {
  results: Record<string, AttributeValue>[];
};

export default function ViewMatches(props: ViewMatchesProps) {
  return (
    <Stack spacing={{ sm: 2, md: 4 }} bgcolor="navy">
      {props.results.map((result, i) => (
        <JobMatchCard key={i} data={result} />
      ))}
    </Stack>
  );
}
