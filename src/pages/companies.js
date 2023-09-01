import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { 
  Tooltip, 
  Typography, 
  Box, Container, 
  Unstable_Grid2 as Grid, 
  Stack, Card, CardContent,
  Button,
  CardHeader,
  SvgIcon
} from '@mui/material';
import React, { useEffect } from 'react';
import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.js';
import 'reactflow/dist/style.css';
import jsonFile from './allvcs.json';

const jsonData = jsonFile;

const centerX = 400; // X position for the center node
const centerY = 500; // Y position for the center node
const radius = 650; // Radius of the concentric circles
const yStep = 100; // Vertical spacing between nodes

const nodeDetailsMap = {
  'did:example:123': 'Decentralized Identity: This id is stored in a very secure Decentralized Web Node.',
  'VerifiableCredential': 'Additional Data 2',
  'ContactCredential' : 'Credential'
  // Add more nodes and their data as needed
};


const Page = () => {
  const [selectedNode, setSelectedNode] = React.useState(null);

  const handleNodeClick = (event, nodeId) => {
    setSelectedNode(nodeId);
  };

  useEffect(() => {
    const container = document.getElementById('network-container');

    const nodes = new DataSet();
    const edges = new DataSet();

    const nodeStyles = {
      shape: 'ellipse', // Use 'ellipse' for circular nodes
      widthConstraint: {
        minimum: 160,
        valign: 'top',
      },
      font: {
        size: 12,
        face: 'Roboto Mono',
        bold: {
          color: 'white',
        },
      },
      borderWidth: 2,
      margin: {
        top: 20, // Adjust the top margin to position text below the circular node
      },
    };
    
    const edgeStyles = {
      width: 2,
      color: {
        color: '#adafb1',
      },
    };
    
    const addedNodeIds = new Set();

    jsonData.forEach((credential, index) => {
      const id = credential.credentialSubject.id;
      const typeId = `type-${index}`;
      const subjectId = `subject-${index}`;

      const angle = (index / jsonData.length) * (2 * Math.PI);
      const radius = 150;
      const nodeX = centerX + radius * Math.cos(angle);
      const nodeY = centerY + radius * Math.sin(angle);

      if (!addedNodeIds.has(id)) {
        nodes.add({
          id,
          label: id,
          ...nodeStyles,
        });
        addedNodeIds.add(id); // Mark the center node as added
      }

      nodes.add({
        id: typeId,
        label: credential.type[0],
        x: nodeX,
        y: nodeY + yStep,
        ...nodeStyles,
        color: '#2199ea',
      });

      nodes.add({
        id: subjectId,
        label: credential.type[1],
        x: nodeX,
        y: nodeY + 2 * yStep,
        ...nodeStyles,
        color: '#0f5f96',
      });

      edges.add({ from: id, to: typeId, ...edgeStyles });
      edges.add({ from: typeId, to: subjectId, ...edgeStyles });

      let yOffset = 50;
      let childNodeCounter = 1;
      for (const key in credential.credentialSubject) {
        if (key !== 'id') {
          const childNodeId = `${subjectId}-${childNodeCounter}`;
          childNodeCounter++;

          const childX = nodeX + 180; // Adjust the child X position relative to the parent node
          const childY = nodeY + 2 * yStep + yOffset;

          nodes.add({
            id: childNodeId,
            label: key + ': ' + credential.credentialSubject[key],
            x: childX,
            y: childY,
            ...nodeStyles,
            color: '#adafb1',
            font: {
              size: 12,
              face: 'Roboto Mono',
              bold: {
                color: 'black',
              },
            },
          });

          edges.add({ from: subjectId, to: childNodeId, ...edgeStyles });

          yOffset += 50;
        }
      }
    });

    const data = {
      nodes: nodes,
      edges: edges,
    };

    const network = new Network(container, data, {});

    network.fit();

    network.on('selectNode', function (params) {
      event.preventDefault();
      const selectedNodeId = params.nodes[0];
      handleNodeClick(null, selectedNodeId);
    });
  });

  return (
    <>
    <Head>
      <title>
        Dashboard | Credid
      </title>
    </Head>
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Typography variant="h4" sx={{color: '#2199ea'}}>
          Dashboard Network View
        </Typography>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={12}
              lg={8}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <CardHeader
                    action={(
                      <Button
                        color="inherit"
                        size="small"
                        startIcon={(
                          <SvgIcon fontSize="small">
                            <ArrowPathIcon />
                          </SvgIcon>
                        )}
                      >
                        Sync
                      </Button>
                    )}
                    title="DWN View of your PII"
                  />
                  <div id="network-container" style={{ width: '700px', height: '700px' }}></div>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                <CardHeader title="Click on a Node to view more details" />
              {/* Tooltip */}
              {selectedNode && (
                <Tooltip
                  open={Boolean(selectedNode)}
                  anchorEl={document.getElementById(selectedNode)}
                  onClose={() => setSelectedNode(null)}
                  placement="left"
                >
                  <Typography variant="body1">
                    {nodeDetailsMap[selectedNode] || 'No additional data found'}
                  </Typography>
                </Tooltip>
              )}
              </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </Container>
  </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;