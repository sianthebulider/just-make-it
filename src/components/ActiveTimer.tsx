import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, X, Bell, Plus, Minus } from 'lucide-react';

interface ActiveTimerProps {
  initialMinutes: number;
  label: string;
  onClose: () => void;
}

export const ActiveTimer: React.FC<ActiveTimerProps> = ({
  initialMinutes,
  label,
  onClose,
}) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            playBeepSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, remainingSeconds]);

  const playBeepSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // Audio context might be restricted or unsupported
    }
  };

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 100;

  const handleAddMinute = () => {
    setRemainingSeconds((prev) => prev + 60);
    setTotalSeconds((prev) => Math.max(prev, remainingSeconds + 60));
    setIsFinished(false);
  };

  const handleSubtractMinute = () => {
    setRemainingSeconds((prev) => Math.max(0, prev - 60));
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(initialMinutes * 60);
    setTotalSeconds(initialMinutes * 60);
    setIsFinished(false);
  };

  return (
    <div
      id="active-cooking-timer-widget"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-stone-900 text-stone-100 px-4 py-3 rounded-2xl shadow-2xl border border-stone-700/60 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="relative flex items-center justify-center w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="currentColor"
            strokeWidth="3.5"
            fill="transparent"
            className="text-stone-700"
          />
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="currentColor"
            strokeWidth="3.5"
            fill="transparent"
            strokeDasharray={113.1}
            strokeDashoffset={113.1 - (113.1 * progressPercent) / 100}
            className={`transition-all duration-500 ease-linear ${
              isFinished ? 'text-emerald-400 animate-pulse' : 'text-amber-500'
            }`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {isFinished ? (
            <Bell className="w-5 h-5 text-emerald-400 animate-bounce" />
          ) : (
            <span className="text-xs font-mono font-bold text-stone-300">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col min-w-[120px]">
        <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
          {isFinished ? 'Timer Complete!' : label}
        </span>
        <span className="text-lg font-mono font-bold tracking-tight text-white">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="flex items-center gap-1.5 ml-2 border-l border-stone-700 pl-3">
        <button
          type="button"
          onClick={() => setIsRunning(!isRunning)}
          className={`p-2 rounded-xl text-white transition-colors ${
            isRunning
              ? 'bg-stone-800 hover:bg-stone-700 text-amber-400'
              : 'bg-amber-600 hover:bg-amber-500 text-white'
          }`}
          title={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          title="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleAddMinute}
          className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          title="+1 minute"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleSubtractMinute}
          className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          title="-1 minute"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl text-stone-500 hover:text-stone-300 hover:bg-stone-800 ml-1 transition-colors"
          title="Close timer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
