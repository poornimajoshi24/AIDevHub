import React, { useState } from 'react';
import { Node } from './Node';
import { Edge } from './Edge';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Network, RefreshCw, ZoomIn, ZoomOut, Layers, ShieldCheck, Cpu } from 'lucide-react';

export const GraphCanvas = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    { id: 'n1', label: 'Cloudflare Edge WAF', subtitle: 'Global Ingress Router', type: 'auth', metrics: '12ms P99', status: 'healthy', x: 15, y: 30 },
    { id: 'n2', label: 'API Gateway (Next.js)', subtitle: 'REST & GraphQL Proxy', type: 'api', metrics: '24k req/m', status: 'healthy', x: 40, y: 30 },
    { id: 'n3', label: 'Gemini AI Inference Service', subtitle: 'LLM Orchestrator', type: 'service', metrics: '1.2s avg', status: 'healthy', x: 75, y: 20 },
    { id: 'n4', label: 'Redis Cluster Subsystem', subtitle: 'High Concurrency Cache', type: 'cache', metrics: '99.8% hit', status: 'healthy', x: 40, y: 70 },
    { id: 'n5', label: 'PostgreSQL Distributed DB', subtitle: 'Prisma ORM Managed', type: 'db', metrics: '3.4ms query', status: 'healthy', x: 75, y: 70 }
  ];

  const edges = [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n2', to: 'n4' },
    { from: 'n4', to: 'n5' }
  ];

  const getNode = (id) => nodes.find(n => n.id === id);

  return (
    <Card hoverEffect={false} className="w-full h-[550px] relative overflow-hidden flex flex-col justify-between p-6">
      {/* Control Bar Top */}
      <div className="flex items-center justify-between z-20 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">System Architecture & Service Graph</h3>
            <p className="text-[11px] text-slate-400">Live topology map generated from repo analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={RefreshCw}>
            Re-layout Graph
          </Button>
        </div>
      </div>

      {/* Interactive SVG Canvas Area */}
      <div className="relative w-full h-full my-4">
        {edges.map((e, idx) => (
          <Edge key={idx} from={getNode(e.from)} to={getNode(e.to)} active={selectedNode?.id === e.from || selectedNode?.id === e.to} />
        ))}

        {nodes.map((node) => (
          <Node
            key={node.id}
            node={node}
            selected={selectedNode?.id === node.id}
            onClick={(n) => setSelectedNode(n)}
          />
        ))}
      </div>

      {/* Bottom Inspector Bar */}
      <div className="z-20 glass-panel rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {selectedNode ? (
          <div className="flex items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="purple" size="lg">
                Selected: {selectedNode.label}
              </Badge>
              <span className="text-xs text-slate-300">{selectedNode.subtitle}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
              Latency: {selectedNode.metrics}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-mono">
            Click on any architectural node to inspect telemetry, traffic routing, & dependency health.
          </p>
        )}
      </div>
    </Card>
  );
};

export default GraphCanvas;
