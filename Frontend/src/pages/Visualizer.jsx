import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { GraphCanvas } from '../components/visualizer/GraphCanvas';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Network, Cpu, Database, Server, Layers, ShieldCheck, Zap, Download } from 'lucide-react';

export const Visualizer = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <PageHeader
        badge={<Badge variant="purple" size="sm">Interactive Architecture Engine</Badge>}
        title="Project Architecture & Service Visualizer"
        subtitle="Explore your repository's microservices dependency map, API gateways, database clusters, and caching layers."
        action={
          <Button
            variant="outline"
            size="md"
            icon={Download}
            onClick={() => alert('Exporting SVG Architecture Diagram...')}
          >
            Export Diagram SVG
          </Button>
        }
      />

      {/* Main Interactive Canvas */}
      <GraphCanvas />

      {/* Architecture Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverEffect={true} className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Nodes</span>
            <Server className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-extrabold text-white font-mono">5 Microservices</span>
          <p className="text-[11px] text-slate-400">1 Ingress WAF, 1 API Proxy, 1 AI Model, 2 Storage</p>
        </Card>

        <Card hoverEffect={true} className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Network Latency P99</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-white font-mono">14.2 ms</span>
          <p className="text-[11px] text-emerald-400">Ultra-fast edge routing active</p>
        </Card>

        <Card hoverEffect={true} className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Security Isolation</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-extrabold text-white font-mono">Zero Trust VPC</span>
          <p className="text-[11px] text-cyan-300">mTLS encrypted payload channels</p>
        </Card>
      </div>
    </div>
  );
};

export default Visualizer;
