import Head from 'next/head';
  
import { Card, CardContent, Container, CardHeader, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        My Data | Credid
      </title>
    </Head>
    <Grid
        xs={8}
        md={8}
        lg={8}
    >
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Container maxWidth="lg">
            <iframe
                src={'http://demo.credid.xyz:3001/protected?token=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1VGFBZHlXSlNYWHZYSlRhbmZFd0t0Nm9UQ2hPUVp1OENNU3RocUF4enR3In0.eyJleHAiOjE2NzQ1NzQyNjgsImlhdCI6MTY3NDU3NDIwOCwianRpIjoiOGRkNWJiY2YtMmQ0ZS00MTJjLWIyMTYtMjg0ZmI4YWZiZmU1IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5ODgwL3JlYWxtcy9tYXN0ZXIiLCJzdWIiOiIwM2VlY2JhZS0wZjBiLTRiYzAtOGMzYS1mYTI0OGI1OGE1ZGUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiZDg0NWZkZDgtMzJmOC00MWVjLWE3MjMtMTliNGY2YmQ0Zjk3IiwiYWNyIjoiMSIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImQ4NDVmZGQ4LTMyZjgtNDFlYy1hNzIzLTE5YjRmNmJkNGY5NyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGlkOmlvbjplaWFlcTNiZHpwdjBzdDRjN3prbmxfeHBocWplcm53cm9ndzF5aWJ4eWVoejF3In0.eLwDAYV-ckjDbTidtbKY3O6SUM9Z5K1_qUcGwV-KR48iK9kXI1FtfOJICdmIQfQtsBwl_yheEBZigaPevpstFIQE_LCDCjohyFx2pCfiQE1GDAKk4Vf_8YioLAzmqwxVfoJZ0K6RYXbh15JAobtsxbgkhLZeZiphtNTqSVVIsU513oD7yarzo4oEFaaRn9p2CepfByq7zYpmhcm6tHSK5pbPXHdy3GZz1FC2f7X5qm_r7v5BNBEXaA4OU0mSf8vAPeCJ-JaVpqaqOkjjIr6sVezV307nUsd-fZEeuU3N8nS9_SYiAbN6wk0eUpPgIHjQQA_VSkT_lrVnXh3jwI0dKA'} // Add the token as a query parameter
                width="100%"
                height="600"
                frameBorder="0"
            />
            </Container>
        </CardContent>
    </Card>
    </Grid>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;