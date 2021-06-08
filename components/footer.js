import React from 'react';
import { Typography, Box, Link } from '@material-ui/core';

export default function TemporaryDrawer() {

  return (
    <Box display="flex" >
      <Box flexGrow={1}><Typography color="error">This is a demo app</Typography></Box>
      <Box><Link href="#">View on GitHub</Link></Box>
    </Box>
  );
}
