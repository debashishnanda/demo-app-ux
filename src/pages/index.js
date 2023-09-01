import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        My Data | Credid
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="24+ Clients"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="3"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="8"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[40, 8, 5, 15, 22, 10]}
              labels={['SSN', 'Phone', 'Address', 'DOB', 'Income', 'Name']}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <OverviewLatestOrders
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'Phone',
                  amount: 30.5,
                  customer: {
                    name: 'Netflix'
                  },
                  createdAt: now,
                  status: 'blocked'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'SSN',
                  amount: 25.1,
                  customer: {
                    name: 'Chase Bank User Feedback'
                  },
                  createdAt: now,
                  status: 'masked'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  ref: 'Income',
                  amount: 10.99,
                  customer: {
                    name: 'Naukri.com'
                  },
                  createdAt: now,
                  status: 'granted'
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  ref: 'Postal Address',
                  amount: 96.43,
                  customer: {
                    name: 'FedX'
                  },
                  createdAt: now,
                  status: 'granted'
                },
                {
                  id: '9f974f239d29ede969367103',
                  ref: 'Email',
                  amount: 32.54,
                  customer: {
                    name: 'Property Broker'
                  },
                  createdAt: 1554670800000,
                  status: 'blocked'
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  ref: 'Home Phone Number',
                  amount: 16.76,
                  customer: {
                    name: 'DMart'
                  },
                  createdAt: 1554670800000,
                  status: 'granted'
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;