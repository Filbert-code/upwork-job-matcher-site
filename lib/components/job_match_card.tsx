import { AttributeValue } from "@aws-sdk/client-dynamodb";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { convertTimeToTimeSince } from "../helper_functions";

type JobMatchCardProps = {
  attribute_data: AttributeValue;
};

export default function JobMatchCard({ attribute_data }: JobMatchCardProps) {
  const data = attribute_data.M!!;
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <Grid container>
          <Grid item xs={9} sm={10}>
            <Box>
              <Typography variant="h3" color="black" marginBottom={1}>
                {data.job_data.M!!.title.S}
              </Typography>
              <Typography variant="h4" marginBottom={4}>
                {convertTimeToTimeSince(data.job_data.M!!.time_posted.S!!)}
              </Typography>

              <Typography variant="h5">Description</Typography>
              <Divider sx={{ marginBottom: 1 }} />
              <Typography
                variant="body1"
                marginBottom={2}
                maxHeight={100}
                overflow="hidden"
              >
                {data.job_data.M!!.description.S}
              </Typography>

              <Typography variant="h5">Rate</Typography>
              <Divider sx={{ marginBottom: 1 }} />
              <Typography variant="body1" marginBottom={2}>
                ${data.job_data.M!!.hourly_min.N} - $
                {data.job_data.M!!.hourly_max.N}
              </Typography>

              <Typography variant="h5">Experience Level</Typography>
              <Divider sx={{ marginBottom: 1 }} />
              <Typography variant="h6" marginBottom={2}>
                {data.job_data.M!!.experience_level.S}
              </Typography>

              <Typography variant="h5">Skills</Typography>
              <Divider sx={{ marginBottom: 1 }} />
              <Typography variant="h6" marginBottom={2}>
                {data.job_data
                  .M!!.skill_badges.L?.map((skill) => skill.S)
                  .join(", ")}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={3} sm={2}>
            <Box bgcolor="primary.main" borderRadius="4px" padding={1}>
              <Typography variant="h5" color="white">
                Match Score: {data.overall_score.N}
              </Typography>
              <Divider sx={{ marginBottom: 1 }} />
              {Object.keys(data.matches.M!!.valueOf()).map((key, i) => {
                return (
                  <Box key={key}>
                    <Typography variant="h6" color="white">
                      {key}: {data.matches.M!![key].N}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", marginBottom: 1 }}>
        <Button
          size="large"
          variant="contained"
          href={`${data.job_data.M!!.url.S}`}
        >
          View Posting
        </Button>
      </CardActions>
    </Card>
  );
}
