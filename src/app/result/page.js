"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;

      try {
        const res = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );
        const sessionData = await res.json();

        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (error) {
        setError("An error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container
        maxWidth="100vw"
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth="100vw"
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Container>
    );
  }

  return (
    <>
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
          <UserButton />
          <Button color="inherit" href="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="100vw"
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        {session.payment_status === "paid" ? (
          <>
            <Typography variant="h4">Happy Learning!</Typography>
            <Box sx={{ mt: 22 }}>
              <Typography variant="h6">Session ID: {session_id}</Typography>
              <Typography variant="body1">
                We have received your payment. You wll receive an email with the
                order details soon!
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h4">Payment Failed!</Typography>
            <Box sx={{ mt: 22 }}>
              <Typography variant="h6">Session ID: {session_id}</Typography>
              <Typography variant="body1">
                Payment was not successful, please try again.
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default ResultPage;
