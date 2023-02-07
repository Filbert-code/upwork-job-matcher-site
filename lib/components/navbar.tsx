import { Box, IconButton, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden/Hidden";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

export default function NavBar(props: any) {
  const showBackButton = props.showBackButton;
  const router = useRouter();
  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent={showBackButton ? "space-between" : "center"}
      bgcolor="black"
      height={75}
      alignItems="center"
    >
      {showBackButton && (
        <IconButton
          size="large"
          sx={{ color: "white" }}
          onClick={() => router.back()}
        >
          <ArrowBackIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      )}
      <Typography variant="h3" component="h1">
        Upwork Job Matcher
      </Typography>
      {showBackButton && (
        <IconButton size="large" sx={{ color: "black" }} disabled>
          <ArrowBackIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      )}
    </Stack>
  );
}
