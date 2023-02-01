import { Box, IconButton, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden/Hidden";
import { Dispatch, SetStateAction } from "react";

type NavBarProps = {
  viewMatches: boolean;
  setViewMatches: Dispatch<SetStateAction<boolean>>;
};

export default function NavBar(props: NavBarProps) {
  const { viewMatches, setViewMatches } = props;
  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent={viewMatches ? "space-between" : "center"}
      bgcolor="black"
      height={75}
      alignItems="center"
    >
      {viewMatches && (
        <IconButton
          size="large"
          sx={{ color: "white" }}
          onClick={() => setViewMatches(false)}
        >
          <ArrowBackIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      )}
      <Typography variant="h3" component="h1">
        Upwork Job Matcher
      </Typography>
      {viewMatches && (
        <IconButton size="large" sx={{ color: "black" }} disabled>
          <ArrowBackIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      )}
    </Stack>
  );
}
