import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import Slide from "@/components/Slide";
import { Play, Pause, RotateCcw } from "lucide-react";

// Hockey stick curve formula: y = 15 + (0.00306 * x²)
// Adjusted to require ~70% variance reduction for 100% capacity increase (15 → 30)
const generateData = () => {
  const points = [];
  for (let x = 0; x <= 80; x += 2) {
    points.push({
      x,
      y: 15 + 0.00306 * x * x,
      roi: 1 + (0.00306 * x * x) / 15,
    });
  }
  return points;
};

const fullData = generateData();

const keyPoints = [
  { x: 0, y: 15, label: "0%" },
  { x: 20, y: 16.22, label: "20%" },
  { x: 40, y: 19.9, label: "40%" },
  { x: 50, y: 22.65, label: "50%" },
  { x: 60, y: 26.02, label: "60%" },
  { x: 70, y: 29.99, label: "70%" }, // ~30 clients = 100% increase
  { x: 75, y: 32.21, label: "75%" },
  { x: 80, y: 34.58, label: "80%" },
];

const HockeyStickSlide = () => {
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animatedData, setAnimatedData] = useState<typeof fullData>([]);
  const [showZones, setShowZones] = useState({ linear: false, inflection: false, exponential: false });
  const [showNuminaPoint, setShowNuminaPoint] = useState(false);
  const [showYAxisLine, setShowYAxisLine] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [clientCount, setClientCount] = useState(15);
  const [showROI, setShowROI] = useState(false);
  const [showClosing, setShowClosing] = useState(false);

  const resetAnimation = useCallback(() => {
    setPhase(0);
    setAnimatedData([]);
    setShowZones({ linear: false, inflection: false, exponential: false });
    setShowNuminaPoint(false);
    setShowYAxisLine(false);
    setShowMetrics(false);
    setClientCount(15);
    setShowROI(false);
    setShowClosing(false);
    setIsPlaying(false);
  }, []);

  const startAnimation = useCallback(() => {
    resetAnimation();
    setIsPlaying(true);
    setPhase(1);
  }, [resetAnimation]);

  const showClosingOverlay = useCallback(() => {
    if (phase === 5 && !showClosing) {
      setShowClosing(true);
    }
  }, [phase, showClosing]);

  // Animation sequence controller
  useEffect(() => {
    if (!isPlaying) return;

    const timers: NodeJS.Timeout[] = [];

    if (phase === 1) {
      // SCENE 1: Draw the curve (smoother animation)
      let dataIndex = 0;
      const drawInterval = setInterval(() => {
        if (dataIndex < fullData.length) {
          setAnimatedData(fullData.slice(0, dataIndex + 1));
          dataIndex++;
        } else {
          clearInterval(drawInterval);
          setPhase(2);
        }
      }, 50);
      timers.push(drawInterval as unknown as NodeJS.Timeout);
    }

    if (phase === 2) {
      // SCENE 2: Zone highlighting (6 seconds)
      timers.push(setTimeout(() => setShowZones(prev => ({ ...prev, linear: true })), 500));
      timers.push(setTimeout(() => setShowZones(prev => ({ ...prev, inflection: true })), 2500));
      timers.push(setTimeout(() => setShowZones(prev => ({ ...prev, exponential: true })), 4500));
      timers.push(setTimeout(() => setPhase(3), 6000));
    }

    if (phase === 3) {
      // SCENE 3: Numina Impact Point (5 seconds)
      timers.push(setTimeout(() => setShowNuminaPoint(true), 500));
      timers.push(setTimeout(() => setShowYAxisLine(true), 1000)); // Show y-axis line after x-axis line
      timers.push(setTimeout(() => setShowMetrics(true), 1500));
      
      // Animate client count from 15 to 30 (100% increase)
      let count = 15;
      const countInterval = setInterval(() => {
        if (count < 30) {
          count++;
          setClientCount(count);
        } else {
          clearInterval(countInterval);
        }
      }, 50);
      timers.push(countInterval as unknown as NodeJS.Timeout);
      
      timers.push(setTimeout(() => setPhase(4), 5000));
    }

    if (phase === 4) {
      // SCENE 4: ROI Multiplier (5 seconds) - then stop and wait for click
      timers.push(setTimeout(() => setShowROI(true), 500));
      timers.push(setTimeout(() => {
        setIsPlaying(false);
        setPhase(5); // Ready for closing, but requires click
      }, 5000));
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [phase, isPlaying]);

  // Gradient definitions
  const GradientDefs = () => (
    <defs>
      <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  );

  return (
    <Slide>
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-4"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-2 block">
            Numina reduces variation in the SMB books
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-left">
            Reducing the variation leads to increase in client capacity
          </h2>
        </motion.div>

        {/* Control buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={startAnimation}
            disabled={isPlaying}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-colors disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm">Play Animation</span>
          </button>
          {phase === 5 && !showClosing && (
            <button
              onClick={showClosingOverlay}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 transition-colors animate-pulse"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm">Show Results</span>
            </button>
          )}
          <button
            onClick={resetAnimation}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 hover:bg-card transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
        </div>

        {/* Chart Container */}
        <div className="flex-1 relative min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={animatedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <GradientDefs />
              
              <XAxis
                dataKey="x"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                label={{
                  value: "Variance Reduction (%)",
                  position: "bottom",
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 12,
                }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                domain={[0, 40]}
                label={{
                  value: "Clients per Accountant",
                  angle: -90,
                  position: "insideLeft",
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 12,
                }}
              />

              {/* Zone highlighting */}
              <AnimatePresence>
                {showZones.linear && (
                  <ReferenceArea
                    x1={0}
                    x2={40}
                    fill="hsl(var(--muted))"
                    fillOpacity={0.15}
                  />
                )}
                {showZones.inflection && (
                  <ReferenceArea
                    x1={40}
                    x2={60}
                    fill="hsl(var(--muted))"
                    fillOpacity={0.15}
                  />
                )}
                {showZones.exponential && (
                  <ReferenceArea
                    x1={60}
                    x2={80}
                    fill="hsl(var(--muted))"
                    fillOpacity={0.15}
                  />
                )}
              </AnimatePresence>

              {/* Numina impact line */}
              {showNuminaPoint && (
                <ReferenceLine
                  x={70}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  strokeOpacity={0.6}
                />
              )}

              {/* Y-axis reference line at 30 clients */}
              {showYAxisLine && (
                <ReferenceLine
                  y={30}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  strokeOpacity={0.6}
                />
              )}

              {/* The hockey stick curve */}
              <Area
                type="monotone"
                dataKey="y"
                stroke="hsl(38, 92%, 50%)"
                strokeWidth={6}
                fill="hsl(38, 92%, 50%)"
                fillOpacity={0.2}
                isAnimationActive={false}
                dot={{ fill: "hsl(38, 92%, 50%)", strokeWidth: 0, r: 4 }}
                activeDot={{ fill: "hsl(38, 92%, 60%)", strokeWidth: 0, r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Zone labels */}
          <AnimatePresence>
            {showZones.linear && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute left-[8%] top-[60%] text-xs md:text-sm"
              >
                <div className="bg-muted/30 border border-border rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="font-semibold text-foreground">LINEAR ZONE</div>
                  <div className="text-muted-foreground text-xs">+1-2 clients per 10%</div>
                </div>
              </motion.div>
            )}
            {showZones.inflection && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute left-[40%] top-[45%] text-xs md:text-sm"
              >
                <div className="bg-muted/30 border border-border rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="font-semibold text-foreground">INFLECTION ZONE</div>
                  <div className="text-muted-foreground text-xs">+3-5 clients per 10%</div>
                </div>
              </motion.div>
            )}
            {showZones.exponential && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute right-[8%] top-[20%] text-xs md:text-sm"
              >
                <div className="bg-muted/30 border border-border rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="font-semibold text-foreground">EXPONENTIAL ZONE</div>
                  <div className="text-muted-foreground text-xs">+6-10 clients per 10%</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Numina Impact Callout */}
          <AnimatePresence>
            {showNuminaPoint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute right-[2%] top-[5%]"
              >
                <div className="bg-card/80 border-2 border-primary/30 rounded-xl px-4 py-3 backdrop-blur-sm">
                  <div className="font-bold text-foreground text-lg">Numina Impact</div>
                  <div className="text-2xl font-bold text-primary">70% Variance Reduction</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Metrics Panel */}
          <AnimatePresence>
            {showMetrics && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-[10%] top-[27%] md:left-[10%]"
              >
                <div className="bg-card/80 border border-border rounded-xl p-4 backdrop-blur-sm space-y-3">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Before → After</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Clients</div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">15</span>
                        <span className="text-primary">→</span>
                        <motion.span
                          key={clientCount}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-foreground font-bold"
                        >
                          {clientCount}
                        </motion.span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Variance</div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">±12h</span>
                        <span className="text-primary">→</span>
                        <span className="text-foreground font-bold">±3.6h</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Avg TPT</div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">22h</span>
                        <span className="text-primary">→</span>
                        <span className="text-foreground font-bold">11h</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Capacity</div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                        className="text-2xl font-bold text-primary"
                      >
                        +100%
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ROI Multipliers */}
          <AnimatePresence>
            {showROI && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute right-[5%] bottom-[15%] md:right-[10%]"
              >
                <div className="bg-card/80 border border-border rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-sm font-medium text-muted-foreground mb-3">ROI Multiplier</div>
                  <div className="space-y-2">
                    {[
                      { reduction: "20%", roi: "1.1x", color: "text-muted-foreground" },
                      { reduction: "40%", roi: "1.3x", color: "text-muted-foreground" },
                      { reduction: "60%", roi: "1.7x", color: "text-muted-foreground" },
                      { reduction: "70%", roi: "2.0x", color: "text-foreground", highlight: true },
                      { reduction: "80%", roi: "2.3x", color: "text-muted-foreground" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.reduction}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
                        className={`flex justify-between items-center gap-6 ${item.highlight ? "bg-primary/10 -mx-2 px-2 py-1 rounded" : ""}`}
                      >
                        <span className={item.color}>{item.reduction}</span>
                        <span className={`font-bold ${item.highlight ? "text-lg text-primary" : ""}`}>
                          {item.roi}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Closing overlay */}
          <AnimatePresence>
            {showClosing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              >
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="text-4xl md:text-6xl font-bold text-primary">70%</div>
                    <div className="text-muted-foreground">Variance Reduction</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <div className="text-4xl md:text-6xl font-bold text-green-400">+100%</div>
                    <div className="text-muted-foreground">Client Capacity</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-2"
                  >
                    <div className="text-4xl md:text-6xl font-bold text-blue-400">2.0x</div>
                    <div className="text-muted-foreground">ROI vs Manual Methods</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="pt-6"
                  >
                    <div className="text-2xl font-bold text-gradient mb-2">
                      Numina: Cross the Inflection Point
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Standardize. Scale. Serve.
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive hint when not playing */}
        {!isPlaying && animatedData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-muted-foreground text-sm"
          >
            Click "Play Animation" to see the hockey stick effect
          </motion.div>
        )}
      </div>
    </Slide>
  );
};

export default HockeyStickSlide;
