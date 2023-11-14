import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Alert, Box } from '@mui/joy';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const VerificationAlert = ({ userData }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Alert
        variant="soft"
        color="danger"
        startDecorator={<AccountCircleRoundedIcon />}
      // endDecorator={
      //   <Button size="sm" variant="solid" color="success">
      //     Close
      //   </Button>
      // }
      >
        <Container className='text-center'>
          Verify your account <Link to={`/verify/${userData.userid}`}>here</Link>
        </Container>
      </Alert>
    </Box>
  );
}