import { ClassValue } from 'clsx';

declare const StegaError: {
    readonly DECODE_FAILED: "STEGA_DECODE_FAILED";
    readonly INVALID_FORMAT: "STEGA_INVALID_FORMAT";
    readonly DOM_MANIPULATION_FAILED: "DOM_MANIPULATION_FAILED";
    readonly CONTEXT_NOT_FOUND: "CONTEXT_NOT_FOUND";
};
type StegaErrorType = (typeof StegaError)[keyof typeof StegaError];
interface ErrorAdditionalData {
    input?: string;
    element?: HTMLElement;
    context?: string;
    [key: string]: string | HTMLElement | undefined;
}
interface ErrorInfo {
    type: StegaErrorType;
    context: string;
    message: string;
    timestamp: string;
    stack?: string;
    additionalData?: ErrorAdditionalData;
}
declare function createErrorInfo(type: StegaErrorType, context: string, error: Error, additionalData?: ErrorAdditionalData): ErrorInfo;
declare function handleStegaError(error: Error, context: string, additionalData?: ErrorAdditionalData): ErrorInfo;
declare function handleDOMError(error: Error, context: string): ErrorInfo;
declare function handleContextError(contextName: string): void;

declare class DOMService {
    /**
     * Creates an HTML element with specified tag and class name
     */
    static createElement(tag: string, className: string): HTMLElement;
    /**
     * Appends an element to the document body
     */
    static appendToBody(element: HTMLElement): void;
    /**
     * Removes an element from the document body
     */
    static removeFromBody(element: HTMLElement): void;
    /**
     * Sets multiple CSS properties on an element
     */
    static setElementStyles(element: HTMLElement, styles: Record<string, string>): void;
    /**
     * Gets the bounding rectangle of an element
     */
    static getElementRect(element: HTMLElement): DOMRect;
    /**
     * Checks if an element is in the viewport
     */
    static isElementInViewport(element: HTMLElement): boolean;
    /**
     * Calculates distance between two points
     */
    static calculateDistance(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * Finds the closest element to a point from a list of elements
     */
    static findClosestElement(pointX: number, pointY: number, elements: NodeListOf<Element>): HTMLElement | null;
    /**
     * Safely adds event listeners
     */
    static addEventListener(element: EventTarget, event: string, handler: EventListener, options?: AddEventListenerOptions): void;
    /**
     * Safely removes event listeners
     */
    static removeEventListener(element: EventTarget, event: string, handler: EventListener, options?: EventListenerOptions): void;
}

/**
 * Debug utility for Prepr Next.js package
 * Provides centralized debug logging with performance optimizations
 */
type DebugArg = string | number | boolean | null | undefined | object;
interface DebugOptions {
    enabled: boolean;
    prefix?: string;
}
declare class DebugLogger {
    private options;
    constructor(options: DebugOptions);
    /**
     * Log a debug message if debug is enabled
     */
    log(message: string, ...args: DebugArg[]): void;
    /**
     * Log a debug warning if debug is enabled
     */
    warn(message: string, ...args: DebugArg[]): void;
    /**
     * Log a debug error if debug is enabled
     */
    error(message: string, ...args: DebugArg[]): void;
    /**
     * Create a scoped logger with additional context
     */
    scope(scopeName: string): DebugLogger;
}
/**
 * Initialize the debug logger
 */
declare function initDebugLogger(enabled?: boolean): void;
/**
 * Get the debug logger instance
 */
declare function getDebugLogger(): DebugLogger;
/**
 * Convenience function for logging
 */
declare function debugLog(message: string, ...args: DebugArg[]): void;
/**
 * Convenience function for warning
 */
declare function debugWarn(message: string, ...args: DebugArg[]): void;
/**
 * Convenience function for errors
 */
declare function debugError(message: string, ...args: DebugArg[]): void;
/**
 * Create a scoped debug logger
 */
declare function createScopedLogger(scopeName: string): DebugLogger;

declare function throttle<T extends (...args: any[]) => any>(func: T, delay: number): T;
declare function createElementCache<T extends Element = Element>(query: string, ttl?: number): () => NodeListOf<T>;

declare function cn(...inputs: ClassValue[]): string;
interface PreprEventData {
    segment?: string;
    variant?: string;
    editMode?: boolean;
    [key: string]: string | boolean | number | undefined;
}
declare function sendPreprEvent(event: string, data?: PreprEventData): void;

export { DOMService, type DebugArg, type ErrorAdditionalData, type ErrorInfo, type PreprEventData, StegaError, type StegaErrorType, cn, createElementCache, createErrorInfo, createScopedLogger, debugError, debugLog, debugWarn, getDebugLogger, handleContextError, handleDOMError, handleStegaError, initDebugLogger, sendPreprEvent, throttle };
