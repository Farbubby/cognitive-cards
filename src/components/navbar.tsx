import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <>
      <AppBar
        position="fixed"
        style={{ width: "100vw", backgroundColor: "#8B4513" }}>
        <Toolbar className="flex flex-row gap-2">
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Cognitive Cards
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
    </>
  );
}
