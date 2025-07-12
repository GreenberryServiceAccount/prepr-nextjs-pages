import { NextIncomingMessage } from 'next/dist/server/request-meta.js';
import { PreprSegment, PreprPreviewBarProps } from '../types/index.cjs';
import { NextRequest, NextResponse } from 'next/server.js';

/**
 * Middleware to set Prepr headers for personalization.
 * @param {import("next/server").NextRequest} request - NextRequest object.
 * @param {import("next/server").NextResponse} response - NextRequest object.
 * @param {object} options - Options object.
 * @param {boolean} options.isPreprPreviewBarEnabled - Whether to enable the Prepr preview bar.
 */
declare function addPreprHeadersToResponse(request: NextRequest, response: NextResponse, options: {
    isPreprPreviewBarEnabled: boolean;
}): Promise<NextResponse<unknown>>;

/**
 * Returns the Prepr Customer ID from the headers
 */
declare function getPreprUUID(req: NextIncomingMessage): string | null;
/**
 * Retuns the active segment from the headers
 */
declare function getActiveSegment(req: NextIncomingMessage): string | null;
/**
 * Returns the active variant from the headers
 */
declare function getActiveVariant(req: NextIncomingMessage): string | null;
/**
 * Helper function to retrieve Prepr headers (will filter out customer ID if in preview mode)
 */
declare function getPreprHeaders(req: NextIncomingMessage): {
    [k: string]: string;
};
/**
 * Fetches the segments from the Prepr API
 * @param {string} token Prepr access token with scope 'segments'
 * @returns {Array} Array of PreprSegmentResponse
 */
declare function getPreprEnvironmentSegments(token: string): Promise<PreprSegment[]>;
/**
 * Fetches all the necessary previewbar props
 * @param {string} token Prepr access token with scope 'segments'
 * @returns {Object} Object with activeSegment, activeVariant and data
 */
declare function getPreviewBarProps({ req, token, isEnabled, }: {
    req: NextIncomingMessage;
    token: string;
    isEnabled?: boolean;
}): Promise<PreprPreviewBarProps>;

export { addPreprHeadersToResponse, getActiveSegment, getActiveVariant, getPreprEnvironmentSegments, getPreprHeaders, getPreprUUID, getPreviewBarProps };
