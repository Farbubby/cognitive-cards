//import Image from "next/image";
//import getStripe from "../utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Toolbar, Typography, Box, Grid } from "@mui/material";
import Head from "next/head";
import { Chat } from "./../components/chat";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cognitive Cards</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar position="static" style={{ width: "100vw" }}>
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
          href="/sign-up"
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
            <Typography variant="h6" gutterBottom>
              Comprehensive explanation of terms
            </Typography>
            <Typography>
              {" "}
              Simply input your text and let our application come up with
              detailed explanation
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quiz yourself to check your understanding
            </Typography>
            <Typography>
              {" "}
              With the help of AI, our application creates tailored quizzes
              based on your topic of study
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Mobile friendly
            </Typography>
            <Typography>
              {" "}
              Access your falshcards from any device, at any time. Study on the
              go with ease!
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
                border: "1px solid",
                borderColor: "grey 300",
                backgroundColor: "lightgreen",
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
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Enroll
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey 300",
                backgroundColor: "lightgreen",
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
                ability.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Enroll
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey 300",
                backgroundColor: "lightgreen",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Ultimate
              </Typography>
              <Typography variant="h6" gutterBottom>
                $6/month
              </Typography>
              <Typography>
                Includes everything in basic and pro. Exclusive quiz feature to
                test your understanding.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Enroll
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <div className="absolute bottom-0 left-0 m-10">
        <Chat />{" "}
      </div>
    </>
  );
}

// import Link from "next/link";
// import { Chat } from "./../components/chat";

// export default function Home() {
//   return (
//     <>
//       <div className="h-screen flex flex-col items-center justify-center gap-8 bg-custom-image bg-cover bg-center relative">
//         <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-lg">
//           <div className="text-5xl font-bold tracking-tight text-gray-800">
//             Cognitive Cards
//           </div>
//           <div className="mt-4 text-lg leading-relaxed text-gray-700">
//             Need help with studying or don't know what to study? Leverage the power of AI to study effectively for any topic!
//           </div>
//           <div className="mt-8 flex flex-row gap-6 justify-center">
//             <Link href="/sign-in">
//               <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300">
//                 Sign in
//               </button>
//             </Link>
//             <Link href="/sign-up">
//               <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300">
//                 Sign up
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Fixed chat component */}
//         <div className="absolute bottom-0 left-0 m-4">
//           <Chat />
//         </div>
//       </div>
//     </>
//   );
// }
