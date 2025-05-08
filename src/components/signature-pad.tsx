"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';

interface SignaturePadProps {
  width?: number;
  height?: number;
  onSignatureChange: (dataUrl: string) => void;
  className?: string;
}

export function SignaturePad({
  width = 400,
  height = 200,
  onSignatureChange,
  className,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  
  const [penColor, setPenColor] = useState('hsl(0 0% 0%)'); // Default black
  const [backgroundColor, setBackgroundColor] = useState('hsl(0 0% 100%)'); // Default white

  useEffect(() => {
    // Dynamically get colors from CSS variables
    // This ensures the canvas matches the theme
    if (typeof window !== 'undefined') {
      const rootStyle = getComputedStyle(document.documentElement);
      const fgHslParts = rootStyle.getPropertyValue('--foreground').trim();
      const cardHslParts = rootStyle.getPropertyValue('--card').trim();
      setPenColor(`hsl(${fgHslParts})`);
      setBackgroundColor(`hsl(${cardHslParts})`);
    }
  }, []); // Runs once on mount

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext('2d');
      if (context) {
        context.scale(ratio, ratio);
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, height);
        context.strokeStyle = penColor;
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        setCtx(context);
        if (isEmpty) { // Ensure initial empty state is propagated
             onSignatureChange("");
        }
      }
    }
  }, [width, height, backgroundColor, penColor, onSignatureChange, isEmpty]);


  const getCoordinates = (event: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    if (!canvasRef.current) return null;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (event.nativeEvent instanceof MouseEvent) {
      clientX = event.nativeEvent.clientX;
      clientY = event.nativeEvent.clientY;
    } else if (event.nativeEvent instanceof TouchEvent && event.nativeEvent.touches.length > 0) {
      clientX = event.nativeEvent.touches[0].clientX;
      clientY = event.nativeEvent.touches[0].clientY;
    } else {
      return null;
    }
    
    return { 
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    const coords = getCoordinates(event);
    if (ctx && coords) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      setIsDrawing(true);
      if (isEmpty) setIsEmpty(false); // Mark as not empty once drawing starts
    }
  }, [ctx, isEmpty]);

  const draw = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctx) return;
    const coords = getCoordinates(event);
    if (coords) {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  }, [isDrawing, ctx]);

  const stopDrawing = useCallback(() => {
    if (!ctx || !canvasRef.current) return;
    ctx.closePath();
    setIsDrawing(false);
    if (!isEmpty) {
        const dataUrl = canvasRef.current.toDataURL('image/png');
        onSignatureChange(dataUrl);
    } else {
        onSignatureChange("");
    }
  }, [ctx, onSignatureChange, isEmpty]);

  const clearSignature = useCallback(() => {
    if (ctx && canvasRef.current) {
      ctx.fillStyle = backgroundColor; // Use resolved background color
      ctx.fillRect(0, 0, width, height);
      setIsEmpty(true);
      onSignatureChange("");
    }
  }, [ctx, width, height, backgroundColor, onSignatureChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const preventScroll = (e: TouchEvent) => {
      if (isDrawing) e.preventDefault();
    };
    canvas.addEventListener('touchmove', preventScroll, { passive: false });
    return () => canvas.removeEventListener('touchmove', preventScroll);
  }, [isDrawing]);

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="border border-input rounded-md cursor-crosshair shadow-sm bg-card"
        style={{ touchAction: 'none' }}
        aria-label="Signature drawing area"
      />
      <Button type="button" variant="outline" onClick={clearSignature} className="w-full sm:w-auto">
        <Eraser className="mr-2 h-4 w-4" /> Clear Signature
      </Button>
    </div>
  );
}
