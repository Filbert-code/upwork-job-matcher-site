import JobMatchCard from "@/lib/components/job_match_card";
import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { Box, Stack } from "@mui/material";

type ViewMatchesProps = {
  subscription: Record<string, AttributeValue>;
};

export default function ViewMatches({ subscription }: ViewMatchesProps) {
  return (
    <Box>
      <Stack spacing={{ xs: 2, sm: 2, md: 4 }} width="100%">
        {subscription.results.L!!.reverse().map((match, i) => {
          return <JobMatchCard key={i} attribute_data={match} />;
        })}
      </Stack>
    </Box>
  );
}
