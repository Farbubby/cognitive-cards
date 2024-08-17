"use client";
import Image from "next/image";
//import getStripe from "../utils/get-stripe";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
});

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStartedClick = useCallback(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.push("/cards");
      } else {
        router.push("/sign-in");
      }
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Cognitive Cards</title>
          <meta name="description" content="Create flashcard from your text" />
        </Head>

        <AppBar
          position="static"
          style={{ width: "100vw", backgroundColor: "#8B4513" }}
        >
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Cognitive Cards
            </Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in">
                Login
              </Button>
              <Button color="inherit" href="/sign-up">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            textAlign: "center",
            my: 4,
          }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to Cognitive Cards
          </Typography>
          <Typography variant="h5" gutterBottom>
            Make flashcards of any topic with the help of AI
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
        </Box>
        <Box sx={{ my: 6, mx: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>
                Comprehensive explanation of terms
              </Typography>
              <Typography>
                {" "}
                Simply input your text and let our application come up with
                detailed explanation
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>
                Quiz yourself to check your understanding
              </Typography>
              <Typography>
                {" "}
                With the help of AI, our application creates tailored quizzes
                based on your topic of study
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>
                Mobile friendly
              </Typography>
              <Typography>
                {" "}
                Access your flashcards from any device, at any time. Study on
                the go with ease!
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ my: 6, mx: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Membership Plans
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "2px solid",
                  borderColor: "grey 300",
                  backgroundColor: "burlywood",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Basic
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Free
                </Typography>
                <Typography>
                  Access to basic features and limited flashcard creation for
                  study needs.
                </Typography>
                <Button
                  disabled={true}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Enrolled
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "2px solid",
                  borderColor: "grey 300",
                  backgroundColor: "lightgrey",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Pro
                </Typography>
                <Typography variant="h6" gutterBottom>
                  $2/month
                </Typography>
                <Typography>
                  Access to basic features and unlimited flashcard generation
                  ability to help you study effectively.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Choose Pro
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "2px solid",
                  borderColor: "grey 300",
                  backgroundColor: "gold",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Ultimate
                </Typography>
                <Typography variant="h6" gutterBottom>
                  $6/month
                </Typography>
                <Typography>
                  Includes everything in basic and pro. Exclusive quiz feature
                  to test your understanding.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Choose Ultimate
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}
