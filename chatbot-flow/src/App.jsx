
import React, { useCallback, useState, useEffect } from 'react';
import { FiMessageSquare, FiArrowLeft } from "react-icons/fi";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Position,
  MiniMap,
  Handle,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import './App.css';

// 1. Node Components
const MessageNode = ({ data }) => (
  <div className="message-node-container">
    <Handle type="target" position={Position.Left} className="custom-handle" />
    <div className="message-node-header">
      <FiMessageSquare size={14} />
      <span>Send Message</span>
    </div>
    <div className="message-node-text">{data.label || 'Text Message'}</div>
    <Handle type="source" position={Position.Right} className="custom-handle" />
  </div>
);

// 2. Node Type Config
const nodeTypeConfig = [
  {
    type: 'message',
    label: 'Message',
    icon: '💬',
    component: MessageNode,
  },
];

const nodeTypes = Object.fromEntries(
  nodeTypeConfig.map(({ type, component }) => [type, component])
);

let id = 0;
const getId = () => `node_${id++}`;

const initialNodes = [];
const initialEdges = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [draftText, setDraftText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showError, setShowError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const addNode = (type) => {
    const newNode = {
      id: getId(),
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: '' },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onConnect = useCallback(
    (params) => {
      const sourceConnections = edges.filter((e) => e.source === params.source);
      if (sourceConnections.length >= 1) {
        setErrorMsg('Source handle can have only one edge!');
        setShowError(true);
        return;
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [edges]
  );

  const onNodeClick = (_event, node) => {
    setSelectedNode(node);
    setDraftText(node.data.label || '');
  };

  const handleSave = () => {
    setErrorMsg('');
    setShowError(false);

    if (selectedNode && draftText.trim() === '') {
      setErrorMsg('Message text cannot be empty!');
      setShowError(true);
      return;
    }

    let updatedNodes = [...nodes];

    if (selectedNode) {
      updatedNodes = updatedNodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: draftText } }
          : node
      );
      setNodes(updatedNodes);
      setSelectedNode((node) =>
        node ? { ...node, data: { ...node.data, label: draftText } } : null
      );
    }

    const nodesWithNoOutEdge = updatedNodes.filter(
      (node) => !edges.some((edge) => edge.source === node.id)
    );

    if (updatedNodes.length > 1 && nodesWithNoOutEdge.length > 1) {
      setErrorMsg('Cannot save Flow: More than one node has empty target handles!');
      setShowError(true);
    } else {
      setShowToast(true);
      console.log('Saved Flow:', { nodes: updatedNodes, edges });
    }
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div>
      {/* Fixed Top Save Button */}
      <button className="global-save-btn" onClick={handleSave}>
        Save Changes
      </button>

      {showToast && <div className="toast">✅ Flow saved successfully!</div>}

      <div className="app-container">
        <div className="flow-area">
          {showError && <div className="error-banner">{errorMsg}</div>}

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>

        <div className="side-panel">
          {!selectedNode ? (
            <div className="nodes-panel">
              {nodeTypeConfig.map((nodeType) => (
                <div
                  key={nodeType.type}
                  className="node-card"
                  onClick={() => addNode(nodeType.type)}
                >
                  <span>{nodeType.icon}</span>
                  <p>{nodeType.label}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="settings-panel">
              <div className="settings-header-row">
                <button className="back-btn" onClick={() => setSelectedNode(null)}>
                  <FiArrowLeft size={18} />
                </button>
                <span className="settings-title">Message</span>
              </div>

              <hr className="divider" />

              <div className="settings-content">
                <label>Text</label>
                <textarea
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  className="text-input"
                  placeholder="Type your message here"
                />
              </div>

              <hr className="divider" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
