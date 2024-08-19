import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <>
      <AppBar
        position="fixed"
        style={{ width: "100vw", backgroundColor: "#8B4513" }}>
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
    </>
  );
}
