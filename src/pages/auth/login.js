import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  MenuItem
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('code'); // Default method

  const countryCodes = [
    { code: '+1', name: 'United States of America' },
    { code: '+91', name: 'India' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+33', name: 'France' },
    { code: '+81', name: 'Japan' },
    { code: '+60', name: 'Malaysia' },
    // Add more country codes and names as needed
  ];

  const formik = useFormik({
    initialValues: {
      email: 'abc@credid.xyz',
      password: '',
      code: '',
      phone: '',
      requestingCode: false,
      requestingOTP: false,
      otp: '',
      selectedCountry: countryCodes[0].code,
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      phone: Yup
        .string()
        .min(10)
        .max(10)
        .required('Phone is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (formik.touched.email) {
          await auth.signIn(values.email, values.password);
        } else if (formik.touched.phone) {
          await auth.signInWithPhone(values.phone, values.otp);
        } else if (formik.touched.code) {
          await auth.signInWithCode(values.code);
        }        
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );

  return (
    <>
      <Head>
        <title>
          Login | Credid Inc.
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3}}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                  sx={{color: '#0f5f96'}}
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
              indicatorColor="primary"
            >
              <Tab
                label="Login Code"
                value="code"
                sx={{
                  '&.Mui-selected': {
                    color: '#137dc5', 
                  },
                  color: '#939598'
                }}
              />
              <Tab
                label="Email"
                value="email"
                sx={{
                  '&.Mui-selected': {
                    color: '#137dc5', 
                  },
                  color: '#939598'
                }}
              />
              <Tab
                label="Phone Number"
                value="phoneNumber"
                sx={{
                  '&.Mui-selected': {
                    color: '#137dc5', 
                  },
                  color: '#939598'
                }}
              />
            </Tabs>
            {method === 'code' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.code && formik.errors.code)}
                    fullWidth
                    helperText={formik.touched.code && formik.errors.code}
                    label="Enter your Secret Code"
                    name="code"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="code"
                    value={formik.values.code}
                  />                  
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3, backgroundColor: '#137dc5'}}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    backgroundColor: '#2199ea', // Set your desired color here
                    '&:hover': {
                      backgroundColor: '#137dc5', // Set a slightly different color for hover state
                    },
                  }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3, color: '#0f5f96'}}
                  onClick={handleSkip}
                >
                  Skip authentication (available for demo)
                </Button>
                <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can reach out to <b>anupam.ratha@credid.xyz</b> for demo.
                  </div>
                </Alert>
              </form>
            )}
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  {formik.touched.email && !formik.values.requestingCode && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        formik.setFieldValue('requestingCode', true);
                      }}
                    >
                      Send Secret code
                    </Button>
                  )}                  
                  {formik.values.requestingCode && (
                    <div>
                      <p>Secret Code has been sent to your email</p>
                      <TextField
                        error={!!(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Enter the Code you received..."
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                      />                    
                    </div>
                  )}
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    backgroundColor: '#2199ea', // Set your desired color here
                    '&:hover': {
                      backgroundColor: '#137dc5', // Set a slightly different color for hover state
                    },
                  }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3, color: '#0f5f96'}}
                  onClick={handleSkip}
                >
                  Skip authentication (available for demo)
                </Button>
                <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can reach out to <b>anupam.ratha@credid.xyz</b> for demo.
                  </div>
                </Alert>
              </form>
            )}
            {method === 'phoneNumber' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>   
                  <TextField
                    select
                    fullWidth
                    label="Country Code"
                    name="selectedCountry"  // This should match the field name in initialValues
                    value={formik.values.selectedCountry}
                    onChange={formik.handleChange}  // Use handleChange with the appropriate field name
                    style={{ marginTop: '16px' }}
                  >
                    {countryCodes.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>       
                  <TextField
                    error={!!(formik.touched.phone && formik.errors.phone)}
                    fullWidth
                    helperText={formik.touched.phone && formik.errors.phone}
                    label="Phone Number"
                    name="phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="phone"
                    value={formik.values.phone}
                  />                  
                  {formik.touched.phone && !formik.values.requestingOTP && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        formik.setFieldValue('requestingOTP', true);
                      }}
                    >
                      Send OTP
                    </Button>
                  )}                  
                  {formik.values.requestingOTP && (
                    <div>
                      <p>OTP has been sent to your phone number</p>
                      <TextField
                        error={!!(formik.touched.otp && formik.errors.otp)}
                        fullWidth
                        helperText={formik.touched.otp && formik.errors.otp}
                        label="Enter the OTP you received..."
                        name="otp"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="otp"
                        value={formik.values.otp}
                      />                    
                    </div>
                  )}
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                  )}
                  <Button
                    fullWidth
                    size="large"
                    sx={{
                      mt: 3,
                      backgroundColor: '#2199ea', // Set your desired color here
                      '&:hover': {
                        backgroundColor: '#137dc5', // Set a slightly different color for hover state
                      },
                    }}
                    type="submit"
                    variant="contained"
                  >
                    Continue
                  </Button>
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 3, color: '#0f5f96'}}
                    onClick={handleSkip}
                  >
                    Skip authentication (available for demo)
                  </Button>
                  <Alert
                    color="primary"
                    severity="info"
                    sx={{ mt: 3 }}
                  >
                <div>
                  You can reach out to <b>info@credid.xyz</b> for demo.
                </div>
              </Alert>
            </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
