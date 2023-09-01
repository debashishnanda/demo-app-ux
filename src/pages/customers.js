import Head from 'next/head';
import { Box } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import jsonFile from './allvcs.json';


const jsonData = jsonFile;
const initialNodes = [];
const initialEdges = [];
const centerX = 400; // X position for the center node
const centerY = 500; // Y position for the center node
const radius = 650; // Radius of the concentric circles
const yStep = 100; // Vertical spacing between nodes

const nodeStyles = {
  width: 260,
  height: 50,
  borderRadius: 8,
  backgroundColor: '#137dc5',
  color: 'white',
  fontSize: 14,
  fontFamily: 'Roboto Mono',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: 10,
};

const nodeStylesDid = {
  width: 260,
  height: 70,
  borderRadius: 12,
  backgroundColor: '#B4F8C8',
  color: 'black',
  fontSize: 24,
  fontFamily: 'Roboto Mono',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: 10,
};

const edgeStyles = {
  stroke: '#adafb1',
  strokeWidth: 2,
};

jsonData.forEach((credential, index) => {
  const id = credential.credentialSubject.id;
  const typeId = `type-${index}`;
  const subjectId = `subject-${index}`;

  // Calculate the positions for the concentric circles
  const angle = (index / jsonData.length) * (2 * Math.PI);
  const nodeX = centerX + radius * Math.cos(angle);
  const nodeY = centerY + radius * Math.sin(angle);

  initialNodes.push(
    { id, position: { x: nodeX, y: nodeY }, data: { label: id }, style: { ...nodeStylesDid} },
    { id: typeId, position: { x: nodeX, y: nodeY + yStep }, data: { label: credential.type[0] }, style: { ...nodeStyles, backgroundColor: '#2199ea' } },
    { id: subjectId, position: { x: nodeX, y: nodeY + 2 * yStep }, data: { label: credential.type[1] }, style: { ...nodeStyles, backgroundColor: '#0f5f96' } }
  );

  initialEdges.push(
    { id: `e-${id}-${typeId}`, source: id, target: typeId, style: { ...edgeStyles }, animated: true },
    { id: `e-${typeId}-${subjectId}`, source: typeId, target: subjectId, style: { ...edgeStyles } }
  );

  let yOffset = 50; // Starting Y position for child nodes
  for (const key in credential.credentialSubject) {
    if (key !== 'id') {
      initialNodes.push(
        { id: `${subjectId}-${key}`, position: { x: nodeX + yStep + yOffset/2, y: nodeY + 3 * yStep + yOffset }, data: { label: key + ': ' + credential.credentialSubject[key] }, style: { ...nodeStyles, backgroundColor: '#adafb1', color: 'black' } }
      );
      initialEdges.push(
        { id: `e-${subjectId}-${key}`, source: subjectId, target: `${subjectId}-${key}`, style: { ...edgeStyles } }
      );
      yOffset += 100; // Increase Y position for the next child node
    }
  }
});

// console.log('Initial Nodes:', initialNodes);
// console.log('Initial Edges:', initialEdges);

function Page() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <>
      <Head>
        <title>
          Dashboard | Credid
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <div style={{ width: '100vw', height: '100vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;