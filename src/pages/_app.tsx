import "@/styles/globals.css";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <AppBar style={{ background: '#bd1313' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' } }}
          >
            Pokemon
          </Typography>
          <Box sx={{ display: { sm: 'block' } }}>
            <Button sx={{ color: '#fff' }}>
              <Link href={'/'}>
                Home
              </Link>
            </Button>
            <Button sx={{ color: '#fff' }}>
              <Link href={'/about'}>
                About
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
        <Component {...pageProps} />
    </div>
  )
}
