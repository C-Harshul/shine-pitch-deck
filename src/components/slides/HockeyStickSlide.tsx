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

// Hockey stick curve formula: y = 25 + (0.015 * x²)
const generateData = () => {
  const points = [];
  for (let x = 0; x <= 80; x += 2) {
    points.push({
      x,
      y: 25 + 0.015 * x * x,
      roi: 1 + (0.015 * x * x) / 25,
    });
  }
  return points;
};

const fullData = generateData();

const keyPoints = [
  { x: 0, y: 25, label: "0%" },
  { x: 20, y: 31, label: "20%" },
  { x: 40, y: 49, label: "40%" },
  { x: 50, y: 62.5, label: "50%" },
  { x: 60, y: 79, label: "60%" },
  { x: 67, y: 92.4, label: "67%" },
  { x: 70, y: 98.5, label: "70%" },
  { x: 80, y: 121, label: "80%" },
];

const HockeyStickSlide = () => {
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animatedData, setAnimatedData] = useState<typeof fullData>([]);
  const [showZones, setShowZones] = useState({ linear: false, inflection: false, exponential: false });
  const [showNuminaPoint, setShowNuminaPoint] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [clientCount, setClientCount] = useState(25);
  const [showROI, setShowROI] = useState(false);
  const [showClosing, setShowClosing] = useState(false);

  const resetAnimation = useCallback(() => {
    setPhase(0);
    setAnimatedData([]);
    setShowZones({ linear: false, inflection: false, exponential: false });
    setShowNuminaPoint(false);
    setShowMetrics(false);
    setClientCount(25);
    setShowROI(false);
    setShowClosing(false);
    setIsPlaying(false);
  }, []);

  const startAnimation = useCallback(() => {
    resetAnimation();
    setIsPlaying(true);
    setPhase(1);
  }, [resetAnimation]);

  // Animation sequence controller
  useEffect(() => {
    if (!isPlaying) return;

    const timers: NodeJS.Timeout[] = [];

    if (phase === 1) {
      // SCENE 1: Draw the curve (8 seconds)
      let dataIndex = 0;
      const drawInterval = setInterval(() => {
        if (dataIndex < fullData.length) {
          setAnimatedData(fullData.slice(0, dataIndex + 1));
          dataIndex++;
        } else {
          clearInterval(drawInterval);
          setPhase(2);
        }
      }, 200);
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
      timers.push(setTimeout(() => setShowMetrics(true), 1500));
      
      // Animate client count from 25 to 42
      let count = 25;
      const countInterval = setInterval(() => {
        if (count < 42) {
          count++;
          setClientCount(count);
        } else {
          clearInterval(countInterval);
        }
      }, 100);
      timers.push(countInterval as unknown as NodeJS.Timeout);
      
      timers.push(setTimeout(() => setPhase(4), 5000));
    }

    if (phase === 4) {
      // SCENE 4: ROI Multiplier (5 seconds)
      timers.push(setTimeout(() => setShowROI(true), 500));
      timers.push(setTimeout(() => setPhase(5), 5000));
    }

    if (phase === 5) {
      // CLOSING (4 seconds)
      timers.push(setTimeout(() => setShowClosing(true), 500));
      timers.push(setTimeout(() => {
        setIsPlaying(false);
      }, 4000));
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
          className="text-center mb-4"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-2 block">
            The Science of Scale
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            The Standardization Hockey Stick
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Why small improvements in variance create exponential capacity gains
          </p>
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
              data={animatedData.length > 0 ? animatedData : fullData}
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
                domain={[0, 130]}
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
                    fill="#ef4444"
                    fillOpacity={0.1}
                  />
                )}
                {showZones.inflection && (
                  <ReferenceArea
                    x1={40}
                    x2={60}
                    fill="#f59e0b"
                    fillOpacity={0.1}
                  />
                )}
                {showZones.exponential && (
                  <ReferenceArea
                    x1={60}
                    x2={80}
                    fill="#10b981"
                    fillOpacity={0.1}
                  />
                )}
              </AnimatePresence>

              {/* Numina impact line */}
              {showNuminaPoint && (
                <ReferenceLine
                  x={67}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              )}

              {/* The hockey stick curve */}
              <Area
                type="monotone"
                dataKey="y"
                stroke="url(#curveGradient)"
                strokeWidth={4}
                fill="url(#areaGradient)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Zone labels */}
          <AnimatePresence>
            {showZones.linear && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-[8%] top-[60%] text-xs md:text-sm"
              >
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="font-semibold text-red-400">LINEAR ZONE</div>
                  <div className="text-muted-foreground text-xs">+1-2 clients per 10%</div>
                </div>
              </motion.div>
            )}
            {showZones.inflection && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-[40%] top-[45%] text-xs md:text-sm"
              >
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="font-semibold text-yellow-400">INFLECTION ZONE</div>
                  <div className="text-muted-foreground text-xs">+3-5 clients per 10%</div>
                </div>
              </motion.div>
            )}
            {showZones.exponential && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-[8%] top-[20%] text-xs md:text-sm"
              >
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="font-semibold text-green-400">EXPONENTIAL ZONE</div>
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
                className="absolute right-[15%] top-[10%]"
              >
                <div className="bg-blue-500/20 border-2 border-blue-500/50 rounded-xl px-4 py-3 backdrop-blur-sm">
                  <div className="font-bold text-blue-400 text-lg">Numina Impact</div>
                  <div className="text-2xl font-bold text-primary">67% Variance Reduction</div>
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
                className="absolute left-[5%] bottom-[15%] md:left-[10%]"
              >
                <div className="bg-card/80 border border-border rounded-xl p-4 backdrop-blur-sm space-y-3">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Before → After</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Clients</div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-400">25</span>
                        <span className="text-primary">→</span>
                        <motion.span
                          key={clientCount}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-green-400 font-bold"
                        >
                          {clientCount}
                        </motion.span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Variance</div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-400">±12h</span>
                        <span className="text-primary">→</span>
                        <span className="text-green-400 font-bold">±4h</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Avg TPT</div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-400">20h</span>
                        <span className="text-primary">→</span>
                        <span className="text-green-400 font-bold">12h</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Capacity</div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-2xl font-bold text-primary"
                      >
                        +68%
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute right-[5%] bottom-[15%] md:right-[10%]"
              >
                <div className="bg-card/80 border border-border rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-sm font-medium text-muted-foreground mb-3">ROI Multiplier</div>
                  <div className="space-y-2">
                    {[
                      { reduction: "20%", roi: "1.2x", color: "text-red-400" },
                      { reduction: "40%", roi: "1.8x", color: "text-yellow-400" },
                      { reduction: "67%", roi: "2.5x", color: "text-blue-400", highlight: true },
                      { reduction: "80%", roi: "3.5x", color: "text-green-400" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.reduction}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3 }}
                        className={`flex justify-between items-center gap-6 ${item.highlight ? "bg-blue-500/10 -mx-2 px-2 py-1 rounded" : ""}`}
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
                    <div className="text-4xl md:text-6xl font-bold text-primary">67%</div>
                    <div className="text-muted-foreground">Variance Reduction</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <div className="text-4xl md:text-6xl font-bold text-green-400">+68%</div>
                    <div className="text-muted-foreground">Client Capacity</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-2"
                  >
                    <div className="text-4xl md:text-6xl font-bold text-blue-400">2.5x</div>
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
