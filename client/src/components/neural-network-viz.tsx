import { Card } from "@/components/ui/card";

export function NeuralNetworkViz() {
  return (
    <Card className="p-8 floating-card">
      <h2 className="text-2xl font-semibold mb-6 text-center">Neural Network Architecture</h2>
      <div className="flex justify-center">
        <svg width="600" height="300" className="border border-border rounded-lg bg-muted/10 backdrop-blur-sm">
          {/* Input Layer */}
          <g data-testid="input-layer">
            <text x="50" y="30" className="text-sm fill-foreground font-medium">Input (x)</text>
            <circle cx="75" cy="150" r="20" className="neural-node fill-primary" />
            <text x="70" y="155" className="text-xs fill-primary-foreground">x</text>
          </g>

          {/* Hidden Layer 1 */}
          <g data-testid="hidden-layer-1">
            <text x="180" y="30" className="text-sm fill-foreground font-medium">Hidden Layer 1 (64)</text>
            <circle cx="200" cy="80" r="15" className="neural-node fill-primary" />
            <circle cx="200" cy="120" r="15" className="neural-node fill-primary" />
            <circle cx="200" cy="160" r="15" className="neural-node fill-primary" />
            <circle cx="200" cy="200" r="15" className="neural-node fill-primary" />
            <text x="195" y="240" className="text-xs fill-muted-foreground">+60 more</text>
          </g>

          {/* Hidden Layer 2 */}
          <g data-testid="hidden-layer-2">
            <text x="320" y="30" className="text-sm fill-foreground font-medium">Hidden Layer 2 (64)</text>
            <circle cx="350" cy="80" r="15" className="neural-node fill-primary" />
            <circle cx="350" cy="120" r="15" className="neural-node fill-primary" />
            <circle cx="350" cy="160" r="15" className="neural-node fill-primary" />
            <circle cx="350" cy="200" r="15" className="neural-node fill-primary" />
            <text x="345" y="240" className="text-xs fill-muted-foreground">+60 more</text>
          </g>

          {/* Output Layer */}
          <g data-testid="output-layer">
            <text x="480" y="30" className="text-sm fill-foreground font-medium">Output (y)</text>
            <circle cx="500" cy="150" r="20" className="neural-node fill-primary" />
            <text x="495" y="155" className="text-xs fill-primary-foreground">y</text>
          </g>

          {/* Connections */}
          <g data-testid="connections">
            {/* Input to Hidden 1 */}
            <line x1="95" y1="150" x2="185" y2="80" className="connection-line stroke-muted-foreground opacity-60" />
            <line x1="95" y1="150" x2="185" y2="120" className="connection-line stroke-muted-foreground opacity-60" />
            <line x1="95" y1="150" x2="185" y2="160" className="connection-line stroke-muted-foreground opacity-60" />
            <line x1="95" y1="150" x2="185" y2="200" className="connection-line stroke-muted-foreground opacity-60" />
            
            {/* Hidden 1 to Hidden 2 */}
            <line x1="215" y1="80" x2="335" y2="80" className="connection-line stroke-muted-foreground opacity-60" />
            <line x1="215" y1="120" x2="335" y2="120" className="connection-line stroke-muted-foreground opacity-60" />
            <line x1="215" y1="160" x2="335" y2="160" className="connection-line stroke-muted-foreground opacity-60" />
            <line x1="215" y1="200" x2="335" y2="200" className="connection-line stroke-muted-foreground opacity-60" />
            
            {/* Hidden 2 to Output */}
            <line x1="365" y1="80" x2="480" y2="150" className="connection-line stroke-muted-foreground opacity-60" />
            <line x1="365" y1="120" x2="480" y2="150" className="connection-line stroke-muted-foreground opacity-60" />
            <line x1="365" y1="160" x2="480" y2="150" className="connection-line stroke-muted-foreground opacity-60" />
            <line x1="365" y1="200" x2="480" y2="150" className="connection-line stroke-muted-foreground opacity-60" />
          </g>
        </svg>
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>2 Hidden Layers × 64 Units + ReLU Activation</p>
      </div>
    </Card>
  );
}
